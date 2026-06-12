import { db } from '../database/connection';

import { ServiceRequestItemRepository }
from '../repositories/service-request-item.repository';

import { ServiceRequestRepository }
from '../repositories/service-request.repository';

import { sanitizeServiceRequestItem }
from '../utils/service-request-item-sanitizer';

import { generateItemReference }
from '../utils/generate-item-reference';

import { FinancialLedgerService }
from './financial-ledger.service';

import { AuditLogService }
from './audit-log.service';

import { ApiError }
from '../utils/api-error';

const repository =
  new ServiceRequestItemRepository();

const requestRepository =
  new ServiceRequestRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();

export class ServiceRequestItemService {

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

      if (
        request.status !== 'pending'
      ) {

        throw new ApiError(

          'Items cannot be added after the first payment',

          400
        );
      }

      data.item_reference =
        generateItemReference();

      /*
        Validation métier
        billetterie
      */

      const isTicket =

        data.item_type
        === 'ticket';

      if (!isTicket) {

        /*
          Champs réservés
          uniquement
          à la billetterie
        */

        const forbiddenFields = [

          'airline_id',

          'system_id',

          'ticket_number',

          'pnr',

          'route',

          'travel_class',

          'departure_date',

          'issued_at',

          'commission_amount',

          'partner_service_fee',

          'tax_amount',
        ];

        for (
          const field
          of forbiddenFields
        ) {

          if (
            data[field] !== undefined
            &&
            data[field] !== null
          ) {

            throw new ApiError(

              `${field} is only allowed for ticket items`,

              400
            );
          }
        }
      }

      data.tht_amount =
        Number(data.tht_amount || 0);

      data.tax_amount =
        Number(data.tax_amount || 0);

      data.partner_service_fee =
        Number(data.partner_service_fee || 0);

      data.service_fee =
        Number(data.service_fee || 0);

      data.cancellation_fee =
        Number(data.cancellation_fee || 0);

      data.modification_fee =
        Number(data.modification_fee || 0);

      data.commission_amount =
        Number(data.commission_amount || 0);

      const ttc =

        data.tht_amount

        +

        data.tax_amount

        +

        data.partner_service_fee

        +

        data.service_fee;

      data.ttc_amount =
        Number(
          ttc.toFixed(2)
        );

      const debit =

        data.ttc_amount

        -

        data.commission_amount;

      data.debit_balance =
        Number(
          debit.toFixed(2)
        );

      if (
        data.item_type === 'ticket'
      ) {

        data.item_status =
          'issued';

      } else {

        data.item_status =
          'active';
      }

      const item =
        await repository.create(
          data,
          actorId,
          client
        );

        /*
          Revenue service agence
        */

        if (data.service_fee > 0) {

          await ledgerService.createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              request.service_id,

            partner_id:
              request.partner_id,

            client_id:
              request.client_id,

            contract_id:
              request.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              isTicket
                ? 'ticket_sale'
                : 'service_sale',

            entry_type:
              'service_revenue',

            direction:
              'income',

            amount:
              data.service_fee,

            currency:
              'USD',

            description:
              `Service revenue for ${item.item_reference}`

          }, 
          actorId,
          client
        );
      }

      /*
        Commission
        uniquement billetterie
      */

      if (
        isTicket
        &&
        data.commission_amount > 0
      ) {

          await ledgerService.createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              data.service_id,

            partner_id:
              data.partner_id,

            client_id:
              data.client_id,

            contract_id:
              data.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              'ticket_sale',

            entry_type:
              'commission',

            direction:
              'income',

            amount:
              data.commission_amount,

            currency:
              'USD',

            description:
              `Commission for ${item.item_reference}`

          }, 
          actorId,
          client
        );
      }

      /*
        Coût partenaire
        uniquement billetterie
      */

      if (
        isTicket
        &&
        data.partner_service_fee > 0
      ) {

          await ledgerService.createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              data.service_id,

            partner_id:
              data.partner_id,

            client_id:
              data.client_id,

            contract_id:
              data.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              'ticket_sale',

            entry_type:
              'partner_cost',

            direction:
              'expense',

            amount:
              data.partner_service_fee,

            currency:
              'USD',

            description:
              `Partner cost for ${item.item_reference}`

          }, 
          actorId,
          client
        );
      }

      /*
        Frais annulation
      */

      if (
        data.cancellation_fee > 0
      ) {

          await ledgerService.createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              data.service_id,

            partner_id:
              data.partner_id,

            client_id:
              data.client_id,

            contract_id:
              data.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              isTicket
                ? 'ticket_cancellation'
                : 'service_cancellation',

            entry_type:
              'cancellation_fee',

            direction:
              'income',

            amount:
              data.cancellation_fee,

            currency:
              'USD',

            description:
              `Cancellation fee for ${item.item_reference}`

          }, 
          actorId,
          client
        );
      }

      /*
        Frais modification
      */

      if (
        data.modification_fee > 0
      ) {

          await ledgerService.createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              data.service_id,

            partner_id:
              data.partner_id,

            client_id:
              data.client_id,

            contract_id:
              data.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              isTicket
                ? 'ticket_modification'
                : 'service_modification',

            entry_type:
              'modification_fee',

            direction:
              'income',

            amount:
              data.modification_fee,

            currency:
              'USD',

            description:
              `Modification fee for ${item.item_reference}`

          }, 
          actorId,
          client
        );
      }

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'service_request_items',

          entity_id:
            item.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            item,

          description:
            `Item ${item.item_reference} created`
        }, client);

      /*
        Recalcul
        request principal
      */

      await requestRepository
        .updateFinancialTotals(
          data.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          data.request_id,
          client
        );

      await client.query(
        'COMMIT'
      );

      return sanitizeServiceRequestItem(
        item
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

 async createModification(
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const parentItem =
        await repository.findById(
          data.parent_item_id,
          client
        );

      if (!parentItem) {

        throw new ApiError(
          'Parent item not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          parentItem.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      /*
        Dossier annulé
      */

      if (
        request.status === 'cancelled'
      ) {

        throw new ApiError(

          'Operation not allowed on cancelled request',

          400
        );
      }

      /*
        Uniquement billet
      */

      if (
        parentItem.item_type
        !== 'ticket'
      ) {

        throw new ApiError(

          'Only ticket items can be modified',

          400
        );
      }

      /*
        Ticket émis uniquement
      */

      if (
        parentItem.item_status
        !== 'issued'
      ) {

        throw new ApiError(

          `Ticket status ${parentItem.item_status} does not allow this operation`,

          400
        );
      }

      /*
        Vérification montant
      */

      if (
        Number(
          data.modification_fee || 0
        ) <= 0
      ) {

        throw new ApiError(

          'Modification fee must be greater than zero',

          400
        );
      }

      if (
        Number(
          data.debit_balance || 0
        ) < 0
      ) {

        throw new ApiError(

          'Debit balance cannot be negative',

          400
        );
      }

      /*
        Construction item
      */

      data.request_id =
        parentItem.request_id;

      data.item_type =
        'modification';

      data.item_status =
        'completed';

      data.item_reference =
        generateItemReference();

      data.customer_name =
        parentItem.customer_name;

      data.airline_id =
        parentItem.airline_id;

      data.system_id =
        parentItem.system_id;

      data.ticket_number =
        parentItem.ticket_number;

      data.pnr =
        parentItem.pnr;

      data.route =
        data.route
        ??
        parentItem.route;

      data.travel_class =
        data.travel_class
        ??
        parentItem.travel_class;

      data.departure_date =
        data.departure_date
        ??
        parentItem.departure_date;

      data.parent_item_id =
        parentItem.id;

      data.tht_amount = 0;

      data.tax_amount = 0;

      data.partner_service_fee = 0;

      data.commission_amount = 0;

      data.cancellation_fee = 0;

      data.ttc_amount =
        Number(
          data.modification_fee
        );

      data.debit_balance =
        Number(
          data.debit_balance || 0
        );

      const item =
        await repository.create(
          data,
          actorId,
          client
        );

      /*
        Ticket parent modifié
      */

      await repository.updateStatus(
        parentItem.id,
        'modified',
        actorId,
        client
      );

      /*
        Frais modification
      */

      await ledgerService
        .createEntry({

          request_id:
            item.request_id,

          item_id:
            item.id,

          service_id:
            null,

          partner_id:
            request.partner_id,

          client_id:
            request.client_id,

          contract_id:
            request.contract_id,

          source_module:
            'service_request_items',

          operation_type:
            'ticket_modification',

          entry_type:
            'modification_fee',

          direction:
            'income',

          amount:
            data.modification_fee,

          currency:
            request.currency,

          description:
            `Ticket modification ${item.item_reference}`

        },
        actorId,
        client
      );

      /*
        Impact partenaire
      */

      if (
        data.debit_balance > 0
      ) {

        await ledgerService
          .createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              null,

            partner_id:
              request.partner_id,

            client_id:
              request.client_id,

            contract_id:
              request.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              'ticket_modification',

            entry_type:
              'partner_cost',

            direction:
              'expense',

            amount:
              data.debit_balance,

            currency:
              request.currency,

            description:
              `Partner cost for ticket modification ${item.item_reference}`

          },
          actorId,
          client
        );
      }

      /*
        Audit
      */

      await auditLogService
        .createLog({

          module:
            'service_request_items',

          entity_id:
            item.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            item,

          description:
            `Modification ${item.item_reference} created`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeServiceRequestItem(
        item
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

  async createCancellation(
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const parentItem =
        await repository.findById(
          data.parent_item_id,
          client
        );

      if (!parentItem) {

        throw new ApiError(
          'Parent item not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          parentItem.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      /*
        Dossier annulé
      */

      if (
        request.status === 'cancelled'
      ) {

        throw new ApiError(

          'Operation not allowed on cancelled request',

          400
        );
      }

      /*
        Uniquement billet
      */

      if (
        parentItem.item_type
        !== 'ticket'
      ) {

        throw new ApiError(

          'Only ticket items can be cancelled',

          400
        );
      }

      /*
        Ticket émis uniquement
      */

      if (
        parentItem.item_status
        !== 'issued'
      ) {

        throw new ApiError(

          `Ticket status ${parentItem.item_status} does not allow this operation`,

          400
        );
      }

      /*
        Validation montants
      */

      if (
        Number(
          data.airline_penalty || 0
        ) < 0
      ) {

        throw new ApiError(

          'Airline penalty cannot be negative',

          400
        );
      }

      if (
        Number(
          data.cancellation_fee || 0
        ) < 0
      ) {

        throw new ApiError(

          'Cancellation fee cannot be negative',

          400
        );
      }

      if (
        Number(
          data.airline_penalty
        )
        >
        Number(
          parentItem.ttc_amount
        )
      ) {

        throw new ApiError(

          'Airline penalty cannot exceed ticket amount',

          400
        );
      }

      /*
        Calcul remboursement
      */

      const companyRefund =

        Number(
          parentItem.ttc_amount
        )

        -

        Number(
          data.airline_penalty
        );

      const customerRefund =

        companyRefund

        -

        Number(
          data.cancellation_fee
        );

      if (
        customerRefund < 0
      ) {

        throw new ApiError(

          'Refund amount cannot be negative',

          400
        );
      }

      /*
        Construction item
      */

      data.request_id =
        parentItem.request_id;

      data.item_type =
        'cancellation';

      data.item_status =
        'completed';

      data.item_reference =
        generateItemReference();

      data.customer_name =
        parentItem.customer_name;

      data.airline_id =
        parentItem.airline_id;

      data.system_id =
        parentItem.system_id;

      data.ticket_number =
        parentItem.ticket_number;

      data.pnr =
        parentItem.pnr;

      data.route =
        parentItem.route;

      data.travel_class =
        parentItem.travel_class;

      data.departure_date =
        parentItem.departure_date;

      data.parent_item_id =
        parentItem.id;

      data.airline_penalty =
        Number(
          data.airline_penalty || 0
        );

      data.refund_amount =
        customerRefund;

      data.tht_amount = 0;

      data.tax_amount = 0;

      data.partner_service_fee = 0;

      data.service_fee = 0;

      data.commission_amount = 0;

      data.modification_fee = 0;

      data.ttc_amount = 0;

      data.debit_balance = 0;

      const item =
        await repository.create(
          data,
          actorId,
          client
        );

      /*
        Ticket parent annulé
      */

      await repository.updateStatus(
        parentItem.id,
        'cancelled',
        actorId,
        client
      );

      /*
        Remboursement compagnie
      */

      await ledgerService
        .createEntry({

          request_id:
            item.request_id,

          item_id:
            item.id,

          service_id:
            null,

          partner_id:
            request.partner_id,

          client_id:
            request.client_id,

          contract_id:
            request.contract_id,

          source_module:
            'service_request_items',

          operation_type:
            'ticket_cancellation',

          entry_type:
            'partner_refund',

          direction:
            'income',

          amount:
            companyRefund,

          currency:
            request.currency,

          description:
            `Airline refund ${item.item_reference}`

        },
        actorId,
        client
      );

      /*
        Remboursement client
      */

      await ledgerService
        .createEntry({

          request_id:
            item.request_id,

          item_id:
            item.id,

          service_id:
            null,

          partner_id:
            request.partner_id,

          client_id:
            request.client_id,

          contract_id:
            request.contract_id,

          source_module:
            'service_request_items',

          operation_type:
            'ticket_cancellation',

          entry_type:
            'customer_refund',

          direction:
            'expense',

          amount:
            customerRefund,

          currency:
            request.currency,

          description:
            `Customer refund ${item.item_reference}`

        },
        actorId,
        client
      );

      /*
        Frais agence
      */

      if (
        Number(
          data.cancellation_fee
        ) > 0
      ) {

        await ledgerService
          .createEntry({

            request_id:
              item.request_id,

            item_id:
              item.id,

            service_id:
              null,

            partner_id:
              request.partner_id,

            client_id:
              request.client_id,

            contract_id:
              request.contract_id,

            source_module:
              'service_request_items',

            operation_type:
              'ticket_cancellation',

            entry_type:
              'cancellation_fee',

            direction:
              'income',

            amount:
              data.cancellation_fee,

            currency:
              request.currency,

            description:
              `Cancellation fee ${item.item_reference}`

          },
          actorId,
          client
        );
      }

      /*
        Audit
      */

      await auditLogService
        .createLog({

          module:
            'service_request_items',

          entity_id:
            item.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            item,

          description:
            `Cancellation ${item.item_reference} created`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeServiceRequestItem(
        item
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
      await repository.findAllItems(
        page,
        limit,
        search,
        requestReference
      );

    return {

      ...result,

      data: result.data.map(
        sanitizeServiceRequestItem
      ),
    };
  }

  async findByRequestId(
    requestId: string
  ) {
    const items =
      await repository.findByRequestId(
        requestId
      );

    return items.map(
      sanitizeServiceRequestItem
    );
  }

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const existingItem =
        await repository.findById(
          id,
          client
        );

      if (!existingItem) {

        throw new ApiError(
          'Item not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          existingItem.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      if (
        request.status !== 'pending'
      ) {

        throw new ApiError(

          'Items cannot be modified after the first payment',

          400
        );
      }

      /*
        Protection métier
      */

      if (
        existingItem.item_status
        === 'cancelled'
      ) {

        throw new ApiError(

          'Cancelled item cannot be modified',

          400
        );
      }

      if (
        existingItem.item_status
        === 'refunded'
      ) {

        throw new ApiError(

          'Refunded item cannot be modified',

          400
        );
      }

      const item =
        await repository.update(
          id,
          data,
          actorId,
          client
        );

      await requestRepository
        .updateFinancialTotals(
          item.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          item.request_id,
          client
        );

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'service_request_items',

          entity_id:
            item.id,

          action_type:
            'update',

          actor_id:
            actorId,

          old_data:
            existingItem,

          new_data:
            item,

          description:
            `Item ${item.item_reference} updated`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeServiceRequestItem(
        item
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

      const existingItem =
        await repository.findById(
          id,
          client
        );

      if (!existingItem) {

        throw new ApiError(
          'Item not found',
          404
        );
      }

      const request =
        await requestRepository.findById(
          existingItem.request_id,
          client
        );

      if (!request) {

        throw new ApiError(
          'Request not found',
          404
        );
      }

      if (
        request.status !== 'pending'
      ) {

        throw new ApiError(

          'Items cannot be deleted after the first payment',

          400
        );
      }

      /*
        Protection audit
      */

      if (
        existingItem.item_status
        === 'cancelled'
      ) {

        throw new ApiError(

          'Cancelled item cannot be deleted',

          400
        );
      }

      if (
        existingItem.item_status
        === 'refunded'
      ) {

        throw new ApiError(

          'Refunded item cannot be deleted',

          400
        );
      }

      await repository.softDelete(
        id,
        actorId,
        client
      );

      /*
        Audit log
      */

      await auditLogService
        .createLog({

          module:
            'service_request_items',

          entity_id:
            existingItem.id,

          action_type:
            'delete',

          actor_id:
            actorId,

          old_data:
            existingItem,

          new_data:
            null,

          description:
            `Item ${existingItem.item_reference} deleted`

        },
        client
      );

      await requestRepository
        .updateFinancialTotals(
          existingItem.request_id,
          client
        );

      await requestRepository
        .updateRequestStatus(
          existingItem.request_id,
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