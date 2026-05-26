import { Router } from 'express';

import { StockController }
from '../controllers/stock.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createStockSchema,
  updateStockSchema
}
from '../validations/stock.validation';

const router = Router();

const stockController =
  new StockController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(createStockSchema),
  stockController.create
);

router.get(
  '/',
  authMiddleware,
  stockController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateStockSchema),
  stockController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  stockController.delete
);

export default router;