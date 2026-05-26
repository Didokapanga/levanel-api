import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { FinancialConsistencyService }
from '../services/financial-consistency.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new FinancialConsistencyService();

export class FinancialConsistencyController {

  /*
    Vérification globale
    système financier
  */

  check = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service.runGlobalCheck();

      return successResponse(
        res,
        result,
        'Financial consistency check completed successfully'
      );
    }
  );

  /*
    Dossiers trop payés
  */

  overpaidRequests = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service.getOverpaidRequests();

      return successResponse(
        res,
        result,
        'Overpaid requests retrieved successfully'
      );
    }
  );

  /*
    Balances négatives
  */

  negativeBalances = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service.getNegativeBalances();

      return successResponse(
        res,
        result,
        'Negative balances retrieved successfully'
      );
    }
  );

  /*
    Completed invalides
  */

  invalidCompletedRequests = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getInvalidCompletedRequests();

      return successResponse(
        res,
        result,
        'Invalid completed requests retrieved successfully'
      );
    }
  );

  /*
    Pending invalides
  */

  invalidPendingRequests = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getInvalidPendingRequests();

      return successResponse(
        res,
        result,
        'Invalid pending requests retrieved successfully'
      );
    }
  );

  /*
    Paiements sans ledger
  */

  missingPaymentLedgers = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getMissingPaymentLedgers();

      return successResponse(
        res,
        result,
        'Missing payment ledgers retrieved successfully'
      );
    }
  );

  /*
    Cautions négatives
  */

  negativeCautionBalances = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getNegativeCautionBalances();

      return successResponse(
        res,
        result,
        'Negative caution balances retrieved successfully'
      );
    }
  );

  /*
    Stocks négatifs
  */

  negativeStockBalances = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getNegativeStockBalances();

      return successResponse(
        res,
        result,
        'Negative stock balances retrieved successfully'
      );
    }
  );

  /*
    Tickets annulés
    sans adjustment
  */

  cancelledWithoutAdjustment = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getCancelledWithoutAdjustment();

      return successResponse(
        res,
        result,
        'Cancelled items without adjustment retrieved successfully'
      );
    }
  );

  /*
    Refund sans ledger
  */

  refundWithoutExpenseLedger = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const result =
        await service
          .getRefundWithoutExpenseLedger();

      return successResponse(
        res,
        result,
        'Refunds without expense ledger retrieved successfully'
      );
    }
  );
}