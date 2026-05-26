import { FinancialLedgerRepository }
from '../repositories/financial-ledger.repository';

import { AuditLogService }
from './audit-log.service';

import { sanitizeLedger }
from '../utils/financial-ledger-sanitizer';

import { generateLedgerReference }
from '../utils/generate-ledger-reference';

const repository =
  new FinancialLedgerRepository();

const auditLogService =
  new AuditLogService();

export class FinancialLedgerService {

  async createEntry(
    data: any,
    actorId: string
  ) {

    data.ledger_reference =
      generateLedgerReference();

    data.amount =
      Number(
        Number(data.amount)
        .toFixed(2)
      );

    const entry =
      await repository.create(
        data,
        actorId
      );

    /*
      Audit log
    */

    await auditLogService
      .createLog({

        module:
          'financial_ledger',

        entity_id:
          entry.id,

        action_type:
          'create',

        actor_id:
          actorId,

        old_data:
          null,

        new_data:
          entry,

        description:
          `Ledger entry ${entry.ledger_reference} created`
      });

    return entry;
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
    requestReference: string,
    entryType: string,
    direction: string
  ) {

    const result =
      await repository.findAll(
        page,
        limit,
        search,
        requestReference,
        entryType,
        direction
      );

    return {

      ...result,

      data: result.data.map(
        sanitizeLedger
      ),
    };
  }

  async findById(
    id: string
  ) {

    const entry =
      await repository.findByLedgerId(
        id
      );

    return sanitizeLedger(
      entry
    );
  }
}