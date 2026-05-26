import { Router } from 'express';

import { PartnerController }
from '../controllers/partner.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createPartnerSchema,
  updatePartnerSchema
}
from '../validations/partner.validation';

const router = Router();

const partnerController =
  new PartnerController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'agent'),
  validate(createPartnerSchema),
  partnerController.create
);

router.get(
  '/',
  authMiddleware,
  partnerController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'agent'),
  validate(updatePartnerSchema),
  partnerController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  partnerController.delete
);

export default router;