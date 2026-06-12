import { CustomerPaymentRepository }
from '../repositories/customer-payment.repository';

import { sanitizeCustomerPayment }
from '../utils/customer-payment-sanitizer';

import { generatePaymentReference }
from '../utils/generate-payment-reference';

import { FinancialLedgerService }
from './financial-ledger.service';

import { AuditLogService }
from './audit-log.service';

import { ServiceRequestRepository }
from '../repositories/service-request.repository';

import { ApiError }
from '../utils/api-error';
import { ContractBalanceService } from './contract-balance.service';
import { db } from '../database/connection';

const requestRepository =
  new ServiceRequestRepository();

const repository =
  new CustomerPaymentRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();

const contractBalanceService =
  new ContractBalanceService();
export class CustomerPaymentService {

  async create(
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      data.payment_reference =
        generatePaymentReference();

      data.amount =
        Number(
          Number(data.amount)
            .toFixed(2)
        );

      const request =
        await requestRepository.findById(
          data.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      if (request.is_deleted) {

        throw new ApiError(
          'Request is deleted',
          400
        );
      }

      if (
        request.status === 'cancelled'
      ) {

        throw new ApiError(

          'Payments cannot be added to a cancelled request',

          400
        );
      }

      const totalAmount =
        Number(
          request.total_amount
        );

      const amountPaid =
        Number(
          request.amount_paid
        );

      const paymentAmount =
        Number(
          data.amount
        );

      if (
        paymentAmount <= 0
      ) {

        throw new ApiError(

          'Payment amount must be greater than zero',

          400
        );
      }

      /*
        Contrôle remboursement
      */

      if (
        data.payment_type === 'refund'
        &&
        paymentAmount > amountPaid
      ) {

        throw new ApiError(

          `Maximum refundable amount is ${amountPaid}`,

          400
        );
      }

      /*
        Contrôle paiement
      */

      const remainingAmount =

        totalAmount

        -

        amountPaid;

      if (
        data.payment_type === 'payment'
        &&
        remainingAmount <= 0
      ) {

        throw new ApiError(

          'Request is already fully paid',

          400
        );
      }

      if (
        data.payment_type === 'payment'
        &&
        paymentAmount > remainingAmount
      ) {

        throw new ApiError(

          `Maximum allowed payment is ${remainingAmount}`,

          400
        );
      }

      /*
        Etat avant paiement
      */

      const previousStatus =
        request.status;

      const contractId =
        request.contract_id;

      const externalCost =
        Number(
          request.external_cost || 0
        );

      const balanceConsumed =
        Boolean(
          request.balance_consumed
        );

      /*
        Création paiement
      */

      const payment =
        await repository.create(
          data,
          actorId,
          client
        );

      /*
        Recalcul financier
      */

      await repository
        .recalculateAmountPaid(
          data.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          data.request_id,
          client
        );

      /*
        Rechargement dossier
      */

      const updatedRequest =
        await requestRepository.findById(
          data.request_id,
          client
        );

      /*
        Consommation caution
      */

      if (

        data.payment_type === 'payment'

        &&

        previousStatus === 'pending'

        &&

        (
          updatedRequest?.status === 'confirmed'
          ||
          updatedRequest?.status === 'completed'
        )

        &&

        !balanceConsumed

        &&

        contractId

        &&

        externalCost > 0

      ) {

        await contractBalanceService
          .consumeBalance(
            contractId,
            externalCost,
            actorId,
            client
          );

        await requestRepository
          .markBalanceConsumed(
            data.request_id,
            client
          );

        await ledgerService
          .createEntry({

            request_id:
              data.request_id,

            service_id:
              request.service_id,

            partner_id:
              request.partner_id,

            client_id:
              request.client_id,

            contract_id:
              contractId,

            source_module:
              'service_requests',

            operation_type:
              'contract_consumption',

            entry_type:
              'partner_expense',

            direction:
              'expense',

            amount:
              externalCost,

            currency:
              request.currency || 'USD',

            description:
              `Contract balance consumption for ${request.request_reference}`

          },
          actorId,
          client
        );
      }

      /*
        Ledger paiement client
      */

      const direction =

        data.payment_type === 'refund'
          ? 'expense'
          : 'income';

      await ledgerService
        .createEntry({

          request_id:
            payment.request_id,

          payment_id:
            payment.id,

          service_id:
            request.service_id,

          partner_id:
            request.partner_id,

          client_id:
            request.client_id,

          contract_id:
            request.contract_id,

          source_module:
            'customer_payments',

          operation_type:
            data.payment_type,

          entry_type:
            'customer_payment',

          direction,

          amount:
            data.amount,

          currency:
            data.currency || 'USD',

          description:
            `Customer payment ${payment.payment_reference}`

        },
        actorId,
        client
      );

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'customer_payments',

          entity_id:
            payment.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            payment,

          description:
            `Payment ${payment.payment_reference} created`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeCustomerPayment(
        payment
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
  }
  
  async findAll(
    page: number,
    limit: number,
    search: string,
    requestReference: string
  ) {

    const result =
      await repository.findAllPayment(
        page,
        limit,
        search,
        requestReference
      );

    return {

      ...result,

      data: result.data.map(
        sanitizeCustomerPayment
      ),
    };
  }

  async findByRequestId(
    requestId: string
  ) {

    const payments =
      await repository.findByRequestId(
        requestId
      );

    return payments.map(
      sanitizeCustomerPayment
    );
  }

  async update(
    id: string,
    data: any,
    actorId: string,
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const existingPayment =
        await repository.findById(
          id,
          client
        );

      if (!existingPayment) {

        throw new ApiError(
          'Payment not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          existingPayment.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      if (
        request.status === 'cancelled'
      ) {

        throw new ApiError(

          'Payments of cancelled requests cannot be modified',

          400
        );
      }

      /*
        Protection dossier terminé
      */

      if (
        request.status === 'completed'
      ) {

        throw new ApiError(

          'Payments of completed requests cannot be modified',

          400
        );
      }

      /*
        Protection remboursement
      */

      if (
        existingPayment.payment_type
        === 'refund'
      ) {

        throw new ApiError(

          'Refund payments cannot be modified',

          400
        );
      }

      if (
        data.amount !== undefined
      ) {

        data.amount =
          Number(
            Number(data.amount)
            .toFixed(2)
          );
      }

      const totalAmount =
        Number(
          request.total_amount
        );

      const currentAmountPaid =
        Number(
          request.amount_paid
        );

      const oldPaymentAmount =
        Number(
          existingPayment.amount
        );

      const newPaymentAmount =
        Number(
          data.amount ??
          existingPayment.amount
        );

      if (
        newPaymentAmount <= 0
      ) {

        throw new ApiError(
          'Payment amount must be greater than zero',
          400
        );
      }

      /*
        Futur montant payé
      */

      const futureAmountPaid =

        currentAmountPaid

        -

        oldPaymentAmount

        +

        newPaymentAmount;

      if (
        futureAmountPaid > totalAmount
      ) {

        throw new ApiError(

          `Maximum allowed amount is ${
            totalAmount -
            (
              currentAmountPaid -
              oldPaymentAmount
            )
          }`,

          400
        );
      }

      const payment =
        await repository.update(
          id,
          data,
          actorId,
          client
        );

      await repository
        .recalculateAmountPaid(
          payment.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          payment.request_id,
          client
        );

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'customer_payments',

          entity_id:
            payment.id,

          action_type:
            'update',

          actor_id:
            actorId,

          old_data:
            existingPayment,

          new_data:
            payment,

          description:
            `Payment ${payment.payment_reference} updated`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeCustomerPayment(
        payment
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
  }

  async delete(
    id: string,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const payment =
        await repository.findById(
          id,
          client
        );

      if (!payment) {

        throw new ApiError(
          'Payment not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          payment.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      if (
        request.is_deleted
      ) {

        throw new ApiError(
          'Request is deleted',
          400
        );
      }

      /*
        Protection remboursement
      */

      if (
        request.status === 'cancelled'
      ) {

        throw new ApiError(

          'Payments of cancelled requests cannot be deleted',

          400
        );
      }

      if (
        payment.payment_type
        === 'refund'
      ) {

        throw new ApiError(

          'Refund payments cannot be deleted',

          400
        );
      }

      /*
        Protection dossier soldé
      */

      if (
        request.status
        === 'completed'
      ) {

        throw new ApiError(

          'Payments of completed requests cannot be deleted',

          400
        );
      }

      const deleted =
        await repository.softDelete(
          id,
          actorId,
          client
        );

      if (!deleted) {

        throw new ApiError(
          'Payment not found',
          404
        );
      }

      await repository
        .recalculateAmountPaid(
          payment.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          payment.request_id,
          client
        );

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'customer_payments',

          entity_id:
            payment.id,

          action_type:
            'delete',

          actor_id:
            actorId,

          old_data:
            payment,

          new_data:
            null,

          description:
            `Payment ${payment.payment_reference} deleted`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
  }
}