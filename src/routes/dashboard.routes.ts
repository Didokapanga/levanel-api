import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { DashboardController }
from '../controllers/dashboard.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new DashboardController();

/*
  Dashboard global
*/

router.get(
  '/overview',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.overview
);

/*
  Revenus mensuels
*/

router.get(
  '/monthly-revenue',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.monthlyRevenue
);

/*
  Cashflow mensuel
*/

router.get(
  '/monthly-cashflow',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.monthlyCashflow
);

/*
  Revenus journaliers
*/

router.get(
  '/daily-revenue-chart',
  authMiddleware,
  controller.dailyRevenueChart
);

/*
  Profit compagnies
*/

router.get(
  '/airline-profits',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.airlineProfits
);

/*
  Pertes annulations
*/

router.get(
  '/cancellation-losses',
  roleMiddleware('admin', 'accountant', 'manager'),
  authMiddleware,
  controller.cancellationLosses
);

/*
  Alertes critiques
*/

router.get(
  '/critical-alerts',
  authMiddleware,
  controller.criticalAlerts
);

/*
  Top compagnies
*/

router.get(
  '/top-airlines',
  authMiddleware,
  controller.topAirlines
);

/*
  Top clients
*/

router.get(
  '/top-clients',
  authMiddleware,
  controller.topClients
);

/*
  Balances faibles
*/

router.get(
  '/low-balances',
  authMiddleware,
  controller.lowBalances
);

export default router;