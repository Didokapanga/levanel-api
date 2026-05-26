import { Response }
from 'express';

import { AuthRequest }
from '../types/express';

import { DashboardService }
from '../services/dashboard.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new DashboardService();

export class DashboardController {

  /*
    Dashboard principal
  */

  overview = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getOverview();

      return successResponse(
        res,
        data,
        'Dashboard retrieved successfully'
      );
    }
  );

  /*
    Revenus mensuels
  */

  monthlyRevenue = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getMonthlyRevenue();

      return successResponse(
        res,
        data,
        'Monthly revenue retrieved successfully'
      );
    }
  );

  /*
    Cashflow mensuel
  */

  monthlyCashflow = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getMonthlyCashflow();

      return successResponse(
        res,
        data,
        'Monthly cashflow retrieved successfully'
      );
    }
  );

  /*
    Graphique journalier
  */

  dailyRevenueChart = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getDailyRevenueChart();

      return successResponse(
        res,
        data,
        'Daily revenue chart retrieved successfully'
      );
    }
  );

  /*
    Profit compagnies
  */

  airlineProfits = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getProfitByAirline();

      return successResponse(
        res,
        data,
        'Airline profits retrieved successfully'
      );
    }
  );

  /*
    Pertes annulation
  */

  cancellationLosses = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getCancellationLosses();

      return successResponse(
        res,
        data,
        'Cancellation losses retrieved successfully'
      );
    }
  );

  /*
    Alertes critiques
  */

  criticalAlerts = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getCriticalAlerts();

      return successResponse(
        res,
        data,
        'Critical alerts retrieved successfully'
      );
    }
  );

  /*
    Top compagnies
  */

  topAirlines = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getTopAirlines();

      return successResponse(
        res,
        data,
        'Top airlines retrieved successfully'
      );
    }
  );

  /*
    Top clients
  */

  topClients = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getTopClients();

      return successResponse(
        res,
        data,
        'Top clients retrieved successfully'
      );
    }
  );

  /*
    Balances faibles
  */

  lowBalances = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const data =
        await service.getLowBalances();

      return successResponse(
        res,
        data,
        'Low balances retrieved successfully'
      );
    }
  );
}