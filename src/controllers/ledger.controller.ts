import { Response } from 'express';

import { LedgerService }
from '../services/ledger.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

import { AuthRequest }
from '../types/express';

const ledgerService =
  new LedgerService();

export class LedgerController {

  findAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const search =
        (req.query.search as string)
        || '';

      const sourceModule =
        (req.query.source_module as string)
        || '';

      const direction =
        (req.query.direction as string)
        || '';

      const entries =
        await ledgerService.getEntries(
          page,
          limit,
          search,
          sourceModule,
          direction
        );

      return successResponse(
        res,
        entries,
        'Ledger entries retrieved successfully'
      );
    }
  );
}