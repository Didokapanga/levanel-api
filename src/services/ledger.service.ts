import { LedgerRepository }
from '../repositories/ledger.repository';

import { sanitizeLedgerEntry }
from '../utils/ledger-sanitizer';

const ledgerRepository =
  new LedgerRepository();

export class LedgerService {

  async record(
    data: any
  ) {

    const entry =
      await ledgerRepository.create(
        data
      );

    return sanitizeLedgerEntry(entry);
  }

  async getEntries(
    page: number,
    limit: number,
    search: string,
    sourceModule: string,
    direction: string
  ) {

    const result =
      await ledgerRepository.findAll(
        page,
        limit,
        search,
        sourceModule,
        direction
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeLedgerEntry
      ),
    };
  }
}