import { Router } from 'express';

import { ServiceController }
from '../controllers/service.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceSchema,
  updateServiceSchema
}
from '../validations/service.validation';

const router = Router();

const serviceController =
  new ServiceController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(createServiceSchema),
  serviceController.create
);

router.get(
  '/',
  authMiddleware,
  serviceController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(updateServiceSchema),
  serviceController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  serviceController.delete
);

export default router;