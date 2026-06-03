import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';

import { loginSchema } from '../validations/auth.validation';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthController();

/**
 * @openapi
 * tags:
 *   - name: Authentication
 *     description: Authentification et gestion de session utilisateur
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authentification utilisateur
 *     description: Permet à un utilisateur de se connecter et d'obtenir un token JWT.
 *     tags:
 *       - Authentication
 *     security: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - email
 *               - password
 *
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: faith@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: Admin@2026
 *
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Login successful
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *
 *                         username:
 *                           type: string
 *                           example: dido
 *
 *                         full_name:
 *                           type: string
 *                           example: Dido Kapanga
 *
 *                         email:
 *                           type: string
 *                           example: faith@gmail.com
 *
 *                         role:
 *                           type: string
 *                           example: admin
 *
 *                         is_active:
 *                           type: boolean
 *                           example: true
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Identifiants invalides
 *
 *       500:
 *         description: Erreur serveur
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
 *     description: Retourne les informations du compte associé au token JWT.
 *     tags:
 *       - Authentication
 *
 *     responses:
 *       200:
 *         description: Informations utilisateur récupérées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Current user retrieved successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *
 *                     username:
 *                       type: string
 *                       example: dido
 *
 *                     full_name:
 *                       type: string
 *                       example: Dido Kapanga
 *
 *                     email:
 *                       type: string
 *                       example: kapangadido@gmail.com
 *
 *                     role:
 *                       type: string
 *                       example: admin
 *
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *
 *       401:
 *         description: Token invalide ou expiré
 *
 *       404:
 *         description: Utilisateur introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.get(
  '/me',
  authMiddleware,
  authController.me
);

export default router;