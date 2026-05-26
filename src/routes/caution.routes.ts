import { Router } from 'express';

import { CautionController }
from '../controllers/caution.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createCautionSchema,
  updateCautionSchema
}
from '../validations/caution.validation';

const router = Router();

const cautionController =
  new CautionController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'accountant'),
  validate(createCautionSchema),
  cautionController.create
);

router.get(
  '/',
  authMiddleware,
  cautionController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'accountant'),
  validate(updateCautionSchema),
  cautionController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  cautionController.delete
);

export default router;