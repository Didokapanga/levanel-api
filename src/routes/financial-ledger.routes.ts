import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { FinancialLedgerController }
from '../controllers/financial-ledger.controller';

const router = Router();

const controller =
  new FinancialLedgerController();

router.get(
  '/',
  authMiddleware,
  controller.findAll
);

router.get(
  '/:id',
  authMiddleware,
  controller.findById
);

export default router;