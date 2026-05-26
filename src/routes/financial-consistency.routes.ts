import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';
import { FinancialConsistencyController } from '../controllers/financial-consistency.controller';

const router = Router();

const controller =
  new FinancialConsistencyController();

/*
  Vérification globale
*/

router.get(
  '/check',
  authMiddleware,
  controller.check
);

/*
  Dossiers trop payés
*/

router.get(
  '/overpaid-requests',
  authMiddleware,
  controller.overpaidRequests
);

/*
  Balances négatives
*/

router.get(
  '/negative-balances',
  authMiddleware,
  controller.negativeBalances
);

/*
  Completed invalides
*/

router.get(
  '/invalid-completed-requests',
  authMiddleware,
  controller.invalidCompletedRequests
);

/*
  Pending invalides
*/

router.get(
  '/invalid-pending-requests',
  authMiddleware,
  controller.invalidPendingRequests
);

/*
  Paiements sans ledger
*/

router.get(
  '/missing-payment-ledgers',
  authMiddleware,
  controller.missingPaymentLedgers
);

/*
  Cautions négatives
*/

router.get(
  '/negative-caution-balances',
  authMiddleware,
  controller.negativeCautionBalances
);

/*
  Stocks négatifs
*/

router.get(
  '/negative-stock-balances',
  authMiddleware,
  controller.negativeStockBalances
);

/*
  Tickets annulés
  sans adjustment
*/

router.get(
  '/cancelled-without-adjustment',
  authMiddleware,
  controller.cancelledWithoutAdjustment
);

/*
  Refund sans ledger
*/

router.get(
  '/refund-without-expense-ledger',
  authMiddleware,
  controller.refundWithoutExpenseLedger
);

export default router;