import { Router }
from 'express';

import { ServiceRequestController }
from '../controllers/service-request.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceRequestSchema,
  updateServiceRequestSchema
}
from '../validations/service-request.validation';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new ServiceRequestController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createServiceRequestSchema
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
  roleMiddleware('admin', 'manager'),
  validate(
    updateServiceRequestSchema
  ),
  controller.update
);

router.delete(
  '/:id',
  roleMiddleware('admin', 'manager'),
  authMiddleware,
  controller.delete
);

export default router;