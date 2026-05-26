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

const requestRepository =
  new ServiceRequestRepository();

const repository =
  new CustomerPaymentRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();

export class CustomerPaymentService {

  async create(
    data: any,
    actorId: string
  ) {

    data.payment_reference =
      generatePaymentReference();

    data.amount =
      Number(
        Number(data.amount)
        .toFixed(2)
      );

    const payment =
      await repository.create(
        data,
        actorId
      );

    await repository
      .recalculateAmountPaid(
        data.request_id
      );

    await requestRepository
      .updateRequestStatus(
        data.request_id
      );

    let direction =
      'income';

    if (
      data.payment_type === 'refund'
    ) {

      direction = 'expense';
    }

    await ledgerService.createEntry({

      request_id:
        payment.request_id,

      payment_id:
        payment.id,

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

    }, actorId);

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
      });

    return sanitizeCustomerPayment(
      payment
    );
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

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const existingPayment =
      await repository.findById(id);

    if (!existingPayment) {

      throw new ApiError(
        'Payment not found',
        404
      );
    }

    if (data.amount !== undefined) {

      data.amount =
        Number(
          Number(data.amount)
          .toFixed(2)
        );
    }

    const payment =
      await repository.update(
        id,
        data,
        actorId
      );

    await repository
      .recalculateAmountPaid(
        payment.request_id
      );

    await requestRepository
      .updateRequestStatus(
        payment.request_id
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
      });

    return sanitizeCustomerPayment(
      payment
    );
  }

  async delete(
    id: string,
    actorId: string
  ) {

    const payment =
      await repository.findById(id);

    if (!payment) {

      throw new ApiError(
        'Payment not found',
        404
      );
    }

    await repository.softDelete(
      id,
      actorId
    );

    await repository
      .recalculateAmountPaid(
        payment.request_id
      );

    await requestRepository
      .updateRequestStatus(
        payment.request_id
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
      });
  }
}