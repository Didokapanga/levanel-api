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

/**
 * @openapi
 * tags:
 *   - name: Dashboard
 *     description: Statistiques, indicateurs financiers et tableaux de bord
 */

/**
 * @openapi
 * /api/dashboard/overview:
 *   get:
 *     summary: Tableau de bord global
 *     description: Retourne l'ensemble des indicateurs financiers, opérationnels et commerciaux.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Dashboard récupéré avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Dashboard retrieved successfully
 *
 *                 data:
 *                   type: object
 */

router.get(
  '/overview',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.overview
);

/**
 * @openapi
 * /api/dashboard/monthly-revenue:
 *   get:
 *     summary: Revenus mensuels
 *     description: Retourne les revenus regroupés par mois.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Revenus récupérés avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *
 *                       month:
 *                         type: string
 *                         example: 2026-01
 *
 *                       income:
 *                         type: string
 *                         example: "12000.00"
 */

router.get(
  '/monthly-revenue',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.monthlyRevenue
);

/**
 * @openapi
 * /api/dashboard/monthly-cashflow:
 *   get:
 *     summary: Cashflow mensuel
 *     description: Retourne les revenus, dépenses et cashflow net par mois.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Cashflow récupéré avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *
 *                       month:
 *                         type: string
 *                         example: 2026-01
 *
 *                       total_income:
 *                         type: string
 *                         example: "12000.00"
 *
 *                       total_expense:
 *                         type: string
 *                         example: "4000.00"
 *
 *                       net_cashflow:
 *                         type: string
 *                         example: "8000.00"
 */

router.get(
  '/monthly-cashflow',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.monthlyCashflow
);

/**
 * @openapi
 * /api/dashboard/daily-revenue-chart:
 *   get:
 *     summary: Revenus journaliers
 *     description: Retourne les revenus journaliers pour affichage graphique.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Données récupérées avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *
 *                       day:
 *                         type: string
 *                         example: 2026-05-01
 *
 *                       revenue:
 *                         type: string
 *                         example: "900.00"
 */

router.get(
  '/daily-revenue-chart',
  authMiddleware,
  controller.dailyRevenueChart
);

/**
 * @openapi
 * /api/dashboard/airline-profits:
 *   get:
 *     summary: Profit par compagnie
 *     description: Retourne les profits générés par compagnie aérienne.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Données récupérées avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *
 *                       name:
 *                         type: string
 *                         example: Ethiopian Airlines
 *
 *                       profit:
 *                         type: string
 *                         example: "4500.00"
 */

router.get(
  '/airline-profits',
  authMiddleware,
  roleMiddleware('admin', 'accountant', 'manager'),
  controller.airlineProfits
);

/**
 * @openapi
 * /api/dashboard/cancellation-losses:
 *   get:
 *     summary: Pertes liées aux annulations
 *     description: Retourne le montant total des pertes liées aux annulations.
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Données récupérées avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: object
 *
 *                   properties:
 *
 *                     cancellation_losses:
 *                       type: string
 *                       example: "1200.00"
 */

router.get(
  '/cancellation-losses',
  roleMiddleware('admin', 'accountant', 'manager'),
  authMiddleware,
  controller.cancellationLosses
);

/**
 * @openapi
 * /api/dashboard/critical-alerts:
 *   get:
 *     summary: Alertes critiques
 *     description: Retourne les alertes nécessitant une intervention.
 *     tags:
 *       - Dashboard
 */

router.get(
  '/critical-alerts',
  authMiddleware,
  controller.criticalAlerts
);

/**
 * @openapi
 * /api/dashboard/top-airlines:
 *   get:
 *     summary: Top compagnies aériennes
 *     description: Classement des compagnies générant le plus d'activité.
 *     tags:
 *       - Dashboard
 */

router.get(
  '/top-airlines',
  authMiddleware,
  controller.topAirlines
);

/**
 * @openapi
 * /api/dashboard/top-clients:
 *   get:
 *     summary: Top clients
 *     description: Classement des clients générant le plus de chiffre d'affaires.
 *     tags:
 *       - Dashboard
 */

router.get(
  '/top-clients',
  authMiddleware,
  controller.topClients
);

/**
 * @openapi
 * /api/dashboard/low-balances:
 *   get:
 *     summary: Contrats à faible solde
 *     description: Retourne les contrats dont la caution ou le stock approche de zéro.
 *     tags:
 *       - Dashboard
 */

router.get(
  '/low-balances',
  authMiddleware,
  controller.lowBalances
);

export default router;