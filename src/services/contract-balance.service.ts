import { db }
from '../database/connection';

import { AuditLogService }
from './audit-log.service';

import { ApiError }
from '../utils/api-error';
import { PoolClient } from 'pg';

const auditLogService =
  new AuditLogService();

export class ContractBalanceService {

  /*
    Déduction
    caution / stock
  */

  async consumeBalance(
    contractId: string,
    amount: number,
    actorId?: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const contractResult =
      await executor.query(

        `
          SELECT *

          FROM contracts

          WHERE id = $1
          AND is_deleted = false

          LIMIT 1
        `,
        [contractId]
      );

    const contract =
      contractResult.rows[0];

    if (!contract) {

      throw new ApiError(
        'Contract not found',
        404
      );
    }

    const debitAmount =
      Number(amount);

    /*
      CONTRACT :
      caution_only
    */

    if (
      contract.contract_type
      === 'caution_only'
    ) {

      const cautionResult =
        await executor.query(

          `
            SELECT *

            FROM cautions

            WHERE contract_id = $1
            AND is_deleted = false
            AND is_active = true

            LIMIT 1
          `,
          [contractId]
        );

      const caution =
        cautionResult.rows[0];

      if (!caution) {

        throw new ApiError(

          'No active caution found',

          400
        );
      }

      const oldData = {

        amount_remaining:
          caution.amount_remaining,

        is_active:
          caution.is_active,
      };

      const remaining =

        Number(
          caution.amount_remaining
        )

        -

        debitAmount;

      if (remaining < 0) {

        throw new ApiError(

          'Insufficient caution balance',

          400
        );
      }

      await executor.query(

        `
          UPDATE cautions

          SET

            amount_remaining = $1,

            is_active = $2,

            updated_at = NOW()

          WHERE id = $3
        `,
        [

          remaining,

          remaining > 0,

          caution.id,
        ]
      );

      /*
        Audit log
      */

      if (actorId) {

        await auditLogService
          .createLog({

            module:
              'contract_balances',

            entity_id:
              caution.id,

            action_type:
              'consume_balance',

            actor_id:
              actorId,

            old_data:
              oldData,

            new_data: {

              amount_remaining:
                remaining,

              is_active:
                remaining > 0,
            },

            description:
              `Caution balance consumed by ${debitAmount}`

          },
          client);
      }
    }

    /*
      CONTRACT :
      caution_stock
    */

    if (
      contract.contract_type
      === 'caution_stock'
    ) {

      const stockResult =
        await executor.query(

          `
            SELECT *

            FROM stocks

            WHERE contract_id = $1
            AND is_deleted = false
            AND is_active = true

            LIMIT 1
          `,
          [contractId]
        );

      const stock =
        stockResult.rows[0];

      if (!stock) {

        throw new ApiError(

          'No active stock found',

          400
        );
      }

      const oldData = {

        amount_remaining:
          stock.amount_remaining,

        is_active:
          stock.is_active,
      };

      const remaining =

        Number(
          stock.amount_remaining
        )

        -

        debitAmount;

      if (remaining < 0) {

        throw new ApiError(

          'Insufficient stock balance',

          400
        );
      }

      await executor.query(

        `
          UPDATE stocks

          SET

            amount_remaining = $1,

            is_active = $2,

            updated_at = NOW()

          WHERE id = $3
        `,
        [

          remaining,

          remaining > 0,

          stock.id,
        ]
      );

      /*
        Audit log
      */

      if (actorId) {

        await auditLogService
          .createLog({

            module:
              'contract_balances',

            entity_id:
              stock.id,

            action_type:
              'consume_balance',

            actor_id:
              actorId,

            old_data:
              oldData,

            new_data: {

              amount_remaining:
                remaining,

              is_active:
                remaining > 0,
            },

            description:
              `Stock balance consumed by ${debitAmount}`

          },
          client);
      }
    }
  }
  /*
    Réinjection
    remboursement
  */

  async restoreBalance(
    contractId: string,
    amount: number,
    actorId?: string,
    client?: PoolClient
  ) {

    const executor =
      client || db;

    const contractResult =
      await executor.query(

        `
          SELECT *

          FROM contracts

          WHERE id = $1
          AND is_deleted = false

          LIMIT 1
        `,
        [contractId]
      );

    const contract =
      contractResult.rows[0];

    if (!contract) {

      throw new ApiError(
        'Contract not found',
        404
      );
    }

    const restoreAmount =
      Number(amount);

    /*
      CAUTION
    */

    if (
      contract.contract_type
      === 'caution_only'
    ) {

      const cautionResult =
        await executor.query(

          `
            SELECT *

            FROM cautions

            WHERE contract_id = $1
            AND is_deleted = false

            LIMIT 1
          `,
          [contractId]
        );

      const caution =
        cautionResult.rows[0];

      if (!caution) {

        throw new ApiError(

          'No caution found',

          400
        );
      }

      const oldData = {

        amount_remaining:
          caution.amount_remaining,

        is_active:
          caution.is_active,
      };

      const newBalance =

        Number(
          caution.amount_remaining
        )

        +

        restoreAmount;

      await executor.query(

        `
          UPDATE cautions

          SET

            amount_remaining = $1,

            is_active = true,

            updated_at = NOW()

          WHERE id = $2
        `,
        [
          newBalance,
          caution.id
        ]
      );

      /*
        Audit log
      */

      if (actorId) {

        await auditLogService
          .createLog({

            module:
              'contract_balances',

            entity_id:
              caution.id,

            action_type:
              'restore_balance',

            actor_id:
              actorId,

            old_data:
              oldData,

            new_data: {

              amount_remaining:
                newBalance,

              is_active:
                true,
            },

            description:
              `Caution balance restored by ${restoreAmount}`

          },
          client);
      }
    }

    /*
      STOCK
    */

    if (
      contract.contract_type
      === 'caution_stock'
    ) {

      const stockResult =
        await executor.query(

          `
            SELECT *

            FROM stocks

            WHERE contract_id = $1
            AND is_deleted = false

            LIMIT 1
          `,
          [contractId]
        );

      const stock =
        stockResult.rows[0];

      if (!stock) {

        throw new ApiError(

          'No stock found',

          400
        );
      }

      const oldData = {

        amount_remaining:
          stock.amount_remaining,

        is_active:
          stock.is_active,
      };

      const newBalance =

        Number(
          stock.amount_remaining
        )

        +

        restoreAmount;

      await executor.query(

        `
          UPDATE stocks

          SET

            amount_remaining = $1,

            is_active = true,

            updated_at = NOW()

          WHERE id = $2
        `,
        [
          newBalance,
          stock.id
        ]
      );

      /*
        Audit log
      */

      if (actorId) {

        await auditLogService
          .createLog({

            module:
              'contract_balances',

            entity_id:
              stock.id,

            action_type:
              'restore_balance',

            actor_id:
              actorId,

            old_data:
              oldData,

            new_data: {

              amount_remaining:
                newBalance,

              is_active:
                true,
            },

            description:
              `Stock balance restored by ${restoreAmount}`

          },
          client);
      }
    }
  }
}