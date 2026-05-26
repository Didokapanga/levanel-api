import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { FinancialLedgerService }
from '../services/financial-ledger.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new FinancialLedgerService();

export class FinancialLedgerController {

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

      const requestReference =
        (req.query.request_reference as string)
        || '';

      const entryType =
        (req.query.entry_type as string)
        || '';

      const direction =
        (req.query.direction as string)
        || '';

      const entries =
        await service.findAll(
          page,
          limit,
          search,
          requestReference,
          entryType,
          direction
        );

      return successResponse(
        res,
        entries,
        'Ledger entries retrieved successfully'
      );
    }
  );

  findById = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const entry =
        await service.findById(
          req.params.id as string
        );

      return successResponse(
        res,
        entry,
        'Ledger entry retrieved successfully'
      );
    }
  );
}