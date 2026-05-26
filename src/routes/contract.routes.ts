import { Router } from 'express';

import { ContractController }
from '../controllers/contract.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createContractSchema,
  updateContractSchema
}
from '../validations/contract.validation';

const router = Router();

const contractController =
  new ContractController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(createContractSchema),
  contractController.create
);

router.get(
  '/',
  authMiddleware,
  contractController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateContractSchema),
  contractController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  contractController.delete
);

export default router;