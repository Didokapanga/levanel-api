import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';

import { loginSchema } from '../validations/auth.validation';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthController();

router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

router.get(
  '/me',
  authMiddleware,
  authController.me
);

export default router;