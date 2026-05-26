import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createTicketAdjustmentSchema,
  updateTicketAdjustmentSchema
}
from '../validations/ticket-adjustment.validation';

import { TicketAdjustmentController }
from '../controllers/ticket-adjustment.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new TicketAdjustmentController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createTicketAdjustmentSchema
  ),
  controller.create
);

router.get(
  '/',
  authMiddleware,
  controller.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(
    'admin',
    'manager'
  ),
  validate(
    updateTicketAdjustmentSchema
  ),
  controller.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(
    'admin'
  ),
  controller.delete
);

export default router;