// src/services/ticket-adjustment.service.ts

import { db }
from '../database/connection';

import { TicketAdjustmentRepository }
from '../repositories/ticket-adjustment.repository';

import { FinancialLedgerService }
from './financial-ledger.service';

import { AuditLogService }
from './audit-log.service';

import { sanitizeTicketAdjustment }
from '../utils/ticket-adjustment-sanitizer';

import { generateAdjustmentReference }
from '../utils/generate-adjustment-reference';

import { ServiceRequestItemRepository }
from '../repositories/service-request-item.repository';

import { ServiceRequestRepository }
from '../repositories/service-request.repository';

import { ContractBalanceService }
from './contract-balance.service';

import { ApiError }
from '../utils/api-error';

const repository =
  new TicketAdjustmentRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();

const itemRepository =
  new ServiceRequestItemRepository();

const requestRepository =
  new ServiceRequestRepository();

const contractBalanceService =
  new ContractBalanceService();

export class TicketAdjustmentService {

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

      data.adjustment_reference =
        generateAdjustmentReference();

      data.airline_fee =
        Number(
          data.airline_fee || 0
        );

      data.agency_fee =
        Number(
          data.agency_fee || 0
        );

      data.refund_amount =
        Number(
          data.refund_amount || 0
        );

      data.new_debit_balance =
        Number(
          data.new_debit_balance || 0
        );

      const item =
        await itemRepository.findById(
          data.item_id
        );

      if (!item) {

        throw new ApiError(
          'Item not found',
          404
        );
      }

      const adjustment =
        await repository.create(
          data,
          actorId
        );

      /*
        MODIFICATION
      */

      if (
        data.adjustment_type
        === 'modification'
      ) {

        await client.query(

          `
            UPDATE
            service_request_items

            SET
              item_status = 'modified'

            WHERE id = $1
          `,
          [data.item_id]
        );

        /*
          IMPORTANT :

          airline_fee modification
          n'est PAS une dépense agence.

          C'est un coût payé
          directement par le client.

          Donc :
          PAS d'écriture ledger.
        */

        if (
          data.agency_fee > 0
        ) {

          await ledgerService
            .createEntry({

              request_id:
                item.request_id,

              item_id:
                data.item_id,

              service_id:
                item.service_id,

              partner_id:
                item.partner_id,

              client_id:
                item.client_id,

              contract_id:
                item.contract_id,

              source_module:
                'ticket_adjustments',

              operation_type:
                'ticket_modification',

              entry_type:
                'agency_modification_fee',

              direction:
                'income',

              amount:
                data.agency_fee,

              currency:
                'USD',

              description:
                `Agency modification fee ${adjustment.adjustment_reference}`

            }, actorId);
        }

        /*
          Audit log
        */

        await auditLogService
          .createLog({

            module:
              'ticket_adjustments',

            entity_id:
              adjustment.id,

            action_type:
              'modification',

            actor_id:
              actorId,

            old_data:
              null,

            new_data:
              adjustment,

            description:
              `Ticket modified ${adjustment.adjustment_reference}`
          });
      }

      /*
        CANCELLATION
      */

      if (
        data.adjustment_type
        === 'cancellation'
      ) {

        await client.query(

          `
            UPDATE
            service_request_items

            SET
              item_status = 'cancelled'

            WHERE id = $1
          `,
          [data.item_id]
        );

        /*
          Réinjection
          caution / stock
        */

        if (
          data.refund_amount > 0
          &&
          item.contract_id
        ) {

          await contractBalanceService
            .restoreBalance(

              item.contract_id,

              data.refund_amount
            );
        }

        /*
          Ici :
          airline_fee devient
          une vraie perte financière.

          Parce que :
          la compagnie retient
          réellement une partie.
        */

        if (
          data.airline_fee > 0
        ) {

          await ledgerService
            .createEntry({

              request_id:
                item.request_id,

              item_id:
                data.item_id,

              service_id:
                item.service_id,

              partner_id:
                item.partner_id,

              client_id:
                item.client_id,

              contract_id:
                item.contract_id,

              source_module:
                'ticket_adjustments',

              operation_type:
                'ticket_cancellation',

              entry_type:
                'airline_cancellation_fee',

              direction:
                'expense',

              amount:
                data.airline_fee,

              currency:
                'USD',

              description:
                `Airline cancellation fee ${adjustment.adjustment_reference}`

            }, actorId);
        }

        if (
          data.agency_fee > 0
        ) {

          await ledgerService
            .createEntry({

              request_id:
                item.request_id,

              item_id:
                data.item_id,

              service_id:
                item.service_id,

              partner_id:
                item.partner_id,

              client_id:
                item.client_id,

              contract_id:
                item.contract_id,

              source_module:
                'ticket_adjustments',

              operation_type:
                'ticket_cancellation',

              entry_type:
                'agency_cancellation_fee',

              direction:
                'income',

              amount:
                data.agency_fee,

              currency:
                'USD',

              description:
                `Agency cancellation fee ${adjustment.adjustment_reference}`

            }, actorId);
        }

        if (
          data.refund_amount > 0
        ) {

          await ledgerService
            .createEntry({

              request_id:
                item.request_id,

              item_id:
                data.item_id,

              service_id:
                item.service_id,

              partner_id:
                item.partner_id,

              client_id:
                item.client_id,

              contract_id:
                item.contract_id,

              source_module:
                'ticket_adjustments',

              operation_type:
                'ticket_cancellation',

              entry_type:
                'customer_refund',

              direction:
                'expense',

              amount:
                data.refund_amount,

              currency:
                'USD',

              description:
                `Customer refund ${adjustment.adjustment_reference}`

            }, actorId);
        }

        /*
          Audit log
        */

        await auditLogService
          .createLog({

            module:
              'ticket_adjustments',

            entity_id:
              adjustment.id,

            action_type:
              'cancellation',

            actor_id:
              actorId,

            old_data:
              null,

            new_data:
              adjustment,

            description:
              `Ticket cancelled ${adjustment.adjustment_reference}`
          });
      }

      /*
        Recalcul
        request principal
      */

      await requestRepository
        .updateFinancialTotals(
          item.request_id
        );

      await requestRepository
        .updateRequestStatus(
          item.request_id
        );

      await client.query(
        'COMMIT'
      );

      return sanitizeTicketAdjustment(
        adjustment
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
    adjustmentType: string,
    search: string
  ) {

    const result =
      await repository.findAllAdjustment(
        page,
        limit,
        adjustmentType,
        search
      );

    return {

      ...result,

      data: result.data.map(
        sanitizeTicketAdjustment
      ),
    };
  }

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const adjustment =
      await repository.findById(id);

    if (!adjustment) {

      throw new ApiError(
        'Adjustment not found',
        404
      );
    }

    /*
      Protection audit
    */

    if (
      adjustment.adjustment_type
      === 'cancellation'
    ) {

      throw new ApiError(

        'Cancellation adjustment cannot be modified',

        400
      );
    }

    const updated =
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
          'ticket_adjustments',

        entity_id:
          updated.id,

        action_type:
          'update',

        actor_id:
          actorId,

        old_data:
          adjustment,

        new_data:
          updated,

        description:
          `Adjustment ${updated.adjustment_reference} updated`
      });

    return sanitizeTicketAdjustment(
      updated
    );
  }

  async delete(
    id: string,
    actorId: string
  ) {

    const adjustment =
      await repository.findById(id);

    if (!adjustment) {

      throw new ApiError(
        'Adjustment not found',
        404
      );
    }

    /*
      Protection critique
    */

    if (
      adjustment.adjustment_type
      === 'cancellation'
    ) {

      throw new ApiError(

        'Cancellation adjustment cannot be deleted',

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
          'ticket_adjustments',

        entity_id:
          adjustment.id,

        action_type:
          'delete',

        actor_id:
          actorId,

        old_data:
          adjustment,

        new_data:
          null,

        description:
          `Adjustment ${adjustment.adjustment_reference} deleted`
      });
  }
}