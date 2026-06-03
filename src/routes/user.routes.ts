import { Router } from 'express';

import { UserController } from '../controllers/user.controller';

import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

import { validate } from '../middleware/validate.middleware';

import { createUserSchema, updateUserSchema } from '../validations/user.validation';

const router = Router();

const userController = new UserController();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Gestion des utilisateurs
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur
 *     description: Création d'un nouvel utilisateur.
 *     tags:
 *       - Users
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - username
 *               - full_name
 *               - email
 *               - password
 *               - role
 *
 *             properties:
 *
 *               username:
 *                 type: string
 *                 example: john
 *
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@test.com
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *               role:
 *                 type: string
 *                 example: admin
 *
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(createUserSchema),
  userController.create
);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Liste des utilisateurs
 *     description: Retourne tous les utilisateurs enregistrés.
 *     tags:
 *       - Users
 *
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *
 *                       id:
 *                         type: string
 *                         format: uuid
 *
 *                       username:
 *                         type: string
 *                         example: dido
 *
 *                       full_name:
 *                         type: string
 *                         example: Dido Kapanga
 *
 *                       email:
 *                         type: string
 *                         example: kapangadido@gmail.com
 *
 *                       role:
 *                         type: string
 *                         example: admin
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       500:
 *         description: Erreur serveur
 */

router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  userController.findAll
);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     description: Met à jour les informations d'un utilisateur.
 *     tags:
 *       - Users
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant utilisateur
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *
 *               username:
 *                 type: string
 *                 example: john
 *
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@test.com
 *
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *
 *               role:
 *                 type: string
 *                 example: manager
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Utilisateur introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateUserSchema),
  userController.update
);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur existant.
 *     tags:
 *       - Users
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant utilisateur
 *
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Utilisateur introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  userController.delete
);

export default router;