import { Router } from 'express';

import { AirlineController }
from '../controllers/airline.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createAirlineSchema,
  updateAirlineSchema
}
from '../validations/airline.validation';

const router = Router();

const airlineController =
  new AirlineController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  validate(createAirlineSchema),
  airlineController.create
);

router.get(
  '/',
  authMiddleware,
  airlineController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validate(updateAirlineSchema),
  airlineController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  airlineController.delete
);

export default router;