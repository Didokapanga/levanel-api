import { StockRepository }
from '../repositories/stock.repository';

import { sanitizeStock }
from '../utils/stock-sanitizer';

import { ApiError }
from '../utils/api-error';
import { ContractRepository } from '../repositories/contract.repository';
import { db } from '../database/connection';
import { FinancialLedgerService } from './financial-ledger.service';
import { AuditLogService } from './audit-log.service';

const stockRepository =
  new StockRepository();

const contractRepository =
  new ContractRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();

export class StockService {

  async createStock(
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const contract =
        await contractRepository.findById(
          data.contract_id,
          client
        );

      if (!contract) {

        throw new ApiError(
          'Contract not found',
          404
        );
      }

      if (
        contract.contract_type
        !== 'caution_stock'
      ) {

        throw new ApiError(

          'Only caution_stock contracts can have stocks',

          400
        );
      }

      const stock =
        await stockRepository.create(
          data,
          actorId,
          client
        );

      await ledgerService
        .createEntry({

          contract_id:
            stock.contract_id,

          partner_id:
            contract.partner_id,

          source_module:
            'stocks',

          operation_type:
            'stock_deposit',

          entry_type:
            'stock',

          direction:
            'income',

          amount:
            stock.amount_initial,

          currency:
            stock.currency,

          description:
            `Stock deposit for contract ${contract.id}`

        },
        actorId,
        client
      );

      await auditLogService
        .createLog({

          module:
            'stocks',

          entity_id:
            stock.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            stock,

          description:
            `Stock created`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeStock(
        stock
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

  async getStocks(
    page: number,
    limit: number,
    search: string,
    contractType: string
  ) {

    const result =
      await stockRepository.findAllStocks(
        page,
        limit,
        search,
        contractType
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeStock
      ),
    };
  }

  async updateStock(
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

      if (

        data.amount_remaining !== undefined

        &&

        data.amount_remaining <= 0

      ) {

        data.is_active = false;

        data.amount_remaining = 0;
      }

      const existingStock =
        await stockRepository.findById(
          id,
          client
        );

      if (!existingStock) {

        throw new ApiError(
          'Stock not found',
          404
        );
      }

      const stock =
        await stockRepository.update(
          id,
          data,
          actorId,
          client
        );

      await auditLogService
        .createLog({

          module:
            'stocks',

          entity_id:
            stock.id,

          action_type:
            'update',

          actor_id:
            actorId,

          old_data:
            existingStock,

          new_data:
            stock,

          description:
            `Stock updated`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeStock(
        stock
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

  async deleteStock(
    id: string,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const stock =
        await stockRepository.findById(
          id,
          client
        );

      if (!stock) {

        throw new ApiError(
          'Stock not found',
          404
        );
      }

      await stockRepository
        .softDelete(
          id,
          actorId,
          client
        );

      await auditLogService
        .createLog({

          module:
            'stocks',

          entity_id:
            stock.id,

          action_type:
            'delete',

          actor_id:
            actorId,

          old_data:
            stock,

          new_data:
            null,

          description:
            `Stock deleted`

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