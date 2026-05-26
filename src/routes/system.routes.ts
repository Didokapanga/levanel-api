import { Router } from 'express';

import { SystemController }
from '../controllers/system.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createSystemSchema,
  updateSystemSchema
}
from '../validations/system.validation';

const router = Router();

const systemController =
  new SystemController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(createSystemSchema),
  systemController.create
);

router.get(
  '/',
  authMiddleware,
  systemController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(updateSystemSchema),
  systemController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  systemController.delete
);

export default router;