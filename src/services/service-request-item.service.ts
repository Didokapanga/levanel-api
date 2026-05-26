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

import { ContractBalanceService }
from './contract-balance.service';

const repository =
  new ServiceRequestItemRepository();

const requestRepository =
  new ServiceRequestRepository();

const ledgerService =
  new FinancialLedgerService();

const contractBalanceService =
  new ContractBalanceService();

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

      const item =
        await repository.create(
          data,
          actorId
        );

      /*
        Déduction
        caution / stock
      */

      if (
        data.contract_id
        &&
        data.debit_balance > 0
      ) {

        await contractBalanceService
          .consumeBalance(

            data.contract_id,

            data.debit_balance
          );
      }

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

        }, actorId);
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

        }, actorId);
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

        }, actorId);
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

        }, actorId);
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

        }, actorId);
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
        });

      /*
        Recalcul
        request principal
      */

      await requestRepository
        .updateFinancialTotals(
          data.request_id
        );

      await requestRepository
        .updateRequestStatus(
          data.request_id
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

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const existingItem =
      await repository.findById(id);

    if (!existingItem) {

      throw new ApiError(
        'Item not found',
        404
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
        actorId
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
      });

    return sanitizeServiceRequestItem(
      item
    );
  }

  async delete(
    id: string,
    actorId: string
  ) {

    const existingItem =
      await repository.findById(id);

    if (!existingItem) {

      throw new ApiError(
        'Item not found',
        404
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
      actorId
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
      });

    await requestRepository
      .updateFinancialTotals(
        existingItem.request_id
      );

    await requestRepository
      .updateRequestStatus(
        existingItem.request_id
      );
  }
}