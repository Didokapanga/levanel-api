import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';

import { loginSchema } from '../validations/auth.validation';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthController();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authentification utilisateur
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: faith@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@2026
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Informations utilisateur connecté
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/me',
  authMiddleware,
  authController.me
);

export default router;