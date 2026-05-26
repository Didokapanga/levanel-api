import { Router } from 'express';

import { UserController } from '../controllers/user.controller';

import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

import { validate } from '../middleware/validate.middleware';

import { createUserSchema, updateUserSchema } from '../validations/user.validation';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(createUserSchema),
  userController.create
);

router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  userController.findAll
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateUserSchema),
  userController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  userController.delete
);

export default router;