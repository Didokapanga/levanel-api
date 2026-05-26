import { Router } from 'express';

import { ClientController } from '../controllers/client.controller';

import { authMiddleware } from '../middleware/auth.middleware';

import { validate } from '../middleware/validate.middleware';

import {
  createClientSchema,
  updateClientSchema
} from '../validations/client.validation';

const router = Router();

const clientController =
  new ClientController();

router.post(
  '/',
  authMiddleware,
  validate(createClientSchema),
  clientController.create
);

router.get(
  '/',
  authMiddleware,
  clientController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  validate(updateClientSchema),
  clientController.update
);

router.delete(
  '/:id',
  authMiddleware,
  clientController.delete
);

export default router;