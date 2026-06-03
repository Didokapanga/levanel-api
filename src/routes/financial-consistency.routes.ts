import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';
import { FinancialConsistencyController } from '../controllers/financial-consistency.controller';

const router = Router();

const controller =
  new FinancialConsistencyController();

/**
 * @openapi
 * tags:
 *   - name: Financial Consistency
 *     description: Outils d'audit et de contrôle de cohérence financière
 */

/**
 * @openapi
 * /api/financial-consistency/check:
 *   get:
 *     summary: Vérification globale
 *     description: Exécute tous les contrôles de cohérence financière et retourne les anomalies détectées.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Vérification effectuée avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       500:
 *         description: Erreur serveur
 */

router.get(
  '/check',
  authMiddleware,
  controller.check
);

/**
 * @openapi
 * /api/financial-consistency/overpaid-requests:
 *   get:
 *     summary: Dossiers trop payés
 *     description: Retourne les demandes dont le montant payé dépasse le montant total dû.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/overpaid-requests',
  authMiddleware,
  controller.overpaidRequests
);

/**
 * @openapi
 * /api/financial-consistency/negative-balances:
 *   get:
 *     summary: Soldes négatifs
 *     description: Retourne les demandes présentant un solde restant négatif.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/negative-balances',
  authMiddleware,
  controller.negativeBalances
);

/**
 * @openapi
 * /api/financial-consistency/invalid-completed-requests:
 *   get:
 *     summary: Dossiers terminés incohérents
 *     description: Retourne les demandes marquées comme completed alors qu'un solde reste à payer.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/invalid-completed-requests',
  authMiddleware,
  controller.invalidCompletedRequests
);

/**
 * @openapi
 * /api/financial-consistency/invalid-pending-requests:
 *   get:
 *     summary: Dossiers pending incohérents
 *     description: Retourne les demandes marquées pending alors qu'aucun solde n'est dû.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/invalid-pending-requests',
  authMiddleware,
  controller.invalidPendingRequests
);

/**
 * @openapi
 * /api/financial-consistency/missing-payment-ledgers:
 *   get:
 *     summary: Paiements sans écriture comptable
 *     description: Retourne les paiements clients ne possédant aucune entrée dans le grand livre financier.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */
router.get(
  '/missing-payment-ledgers',
  authMiddleware,
  controller.missingPaymentLedgers
);

/**
 * @openapi
 * /api/financial-consistency/negative-caution-balances:
 *   get:
 *     summary: Cautions négatives
 *     description: Retourne les cautions dont le montant restant est inférieur à zéro.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/negative-caution-balances',
  authMiddleware,
  controller.negativeCautionBalances
);

/**
 * @openapi
 * /api/financial-consistency/negative-stock-balances:
 *   get:
 *     summary: Stocks négatifs
 *     description: Retourne les stocks dont le montant restant est inférieur à zéro.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/negative-stock-balances',
  authMiddleware,
  controller.negativeStockBalances
);

/**
 * @openapi
 * /api/financial-consistency/cancelled-without-adjustment:
 *   get:
 *     summary: Tickets annulés sans ajustement
 *     description: Retourne les billets annulés qui ne possèdent aucun ajustement associé.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/cancelled-without-adjustment',
  authMiddleware,
  controller.cancelledWithoutAdjustment
);

/**
 * @openapi
 * /api/financial-consistency/refund-without-expense-ledger:
 *   get:
 *     summary: Remboursements sans écriture de dépense
 *     description: Retourne les remboursements clients qui ne possèdent aucune écriture comptable de type expense.
 *     tags:
 *       - Financial Consistency
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 */

router.get(
  '/refund-without-expense-ledger',
  authMiddleware,
  controller.refundWithoutExpenseLedger
);

export default router;