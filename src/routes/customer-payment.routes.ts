import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createCustomerPaymentSchema,
  updateCustomerPaymentSchema
}
from '../validations/customer-payment.validation';

import { CustomerPaymentController }
from '../controllers/customer-payment.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new CustomerPaymentController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createCustomerPaymentSchema
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
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    updateCustomerPaymentSchema
  ),
  controller.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  controller.delete
);

export default router;