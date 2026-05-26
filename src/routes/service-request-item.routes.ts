import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceRequestItemSchema
}
from '../validations/service-request-item.validation';

import {
  updateServiceRequestItemSchema
}
from '../validations/service-request-item.validation';

import { ServiceRequestItemController }
from '../controllers/service-request-item.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new ServiceRequestItemController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createServiceRequestItemSchema
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
    updateServiceRequestItemSchema
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