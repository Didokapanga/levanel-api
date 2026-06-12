import { CautionRepository }
from '../repositories/caution.repository';

import { ContractRepository }
from '../repositories/contract.repository';

import { sanitizeCaution }
from '../utils/caution-sanitizer';

import { ApiError }
from '../utils/api-error';
import { db } from '../database/connection';
import { FinancialLedgerService } from './financial-ledger.service';
import { AuditLogService } from './audit-log.service';

const cautionRepository =
  new CautionRepository();

const contractRepository =
  new ContractRepository();

const ledgerService =
  new FinancialLedgerService();

const auditLogService =
  new AuditLogService();
export class CautionService {

  async createCaution(
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
        !== 'caution_only'
        &&
        contract.contract_type
        !== 'caution_stock'
      ) {

        throw new ApiError(

          'Only caution_only and caution_stock contracts can have cautions',

          400
        );
      }

      const caution =
        await cautionRepository.create(
          data,
          actorId,
          client
        );

      /*
        Ledger
      */

      await ledgerService
        .createEntry({

          contract_id:
            caution.contract_id,

          partner_id:
            contract.partner_id,

          source_module:
            'cautions',

          operation_type:
            'caution_creation',

          entry_type:
            'caution_funding',

          direction:
            'income',

          amount:
            caution.amount_initial,

          currency:
            caution.currency,

          description:
            `Caution funding ${caution.id}`

        },
        actorId,
        client
      );

      /*
        Audit
      */

      await auditLogService
        .createLog({

          module:
            'cautions',

          entity_id:
            caution.id,

          action_type:
            'create',

          actor_id:
            actorId,

          old_data:
            null,

          new_data:
            caution,

          description:
            `Caution created`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeCaution(
        caution
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

  async getCautions(
    page: number,
    limit: number,
    search: string,
    contractType: string
  ) {

    const result =
      await cautionRepository.findAllCautions(
        page,
        limit,
        search,
        contractType
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeCaution
      ),
    };
  }

  async updateCaution(
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

      const existingCaution =
        await cautionRepository.findById(
          id,
          client
        );

      if (!existingCaution) {

        throw new ApiError(
          'Caution not found',
          404
        );
      }

      if (
        data.amount_remaining !== undefined
        &&
        data.amount_remaining <= 0
      ) {

        data.is_active = false;

        data.amount_remaining = 0;
      }

      const caution =
        await cautionRepository.update(
          id,
          data,
          actorId,
          client
        );

      if (!caution) {

        throw new ApiError(
          'Caution not found',
          404
        );
      }

      /*
        Audit
      */

      await auditLogService
        .createLog({

          module:
            'cautions',

          entity_id:
            caution.id,

          action_type:
            'update',

          actor_id:
            actorId,

          old_data:
            existingCaution,

          new_data:
            caution,

          description:
            `Caution updated`

        },
        client
      );

      await client.query(
        'COMMIT'
      );

      return sanitizeCaution(
        caution
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

  async deleteCaution(
    id: string,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const caution =
        await cautionRepository.findById(
          id,
          client
        );

      if (!caution) {

        throw new ApiError(
          'Caution not found',
          404
        );
      }

      await cautionRepository
        .softDelete(
          id,
          actorId,
          client
        );

      /*
        Audit
      */

      await auditLogService
        .createLog({

          module:
            'cautions',

          entity_id:
            caution.id,

          action_type:
            'delete',

          actor_id:
            actorId,

          old_data:
            caution,

          new_data:
            null,

          description:
            `Caution deleted`

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