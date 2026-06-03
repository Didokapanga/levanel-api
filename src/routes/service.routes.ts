import { Router } from 'express';

import { ServiceController }
from '../controllers/service.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceSchema,
  updateServiceSchema
}
from '../validations/service.validation';

const router = Router();

const serviceController =
  new ServiceController();

/**
 * @openapi
 * tags:
 *   - name: Services
 *     description: Gestion des services proposés par l'agence
 */

/**
 * @openapi
 * /api/services:
 *   post:
 *     summary: Créer un service
 *     description: Crée un nouveau service métier. Une référence interne est automatiquement générée.
 *     tags:
 *       - Services
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *                 example: Billetterie
 *
 *               description:
 *                 type: string
 *                 example: Gestion des billets
 *
 *               color:
 *                 type: string
 *                 example: "#2563EB"
 *
 *               icon:
 *                 type: string
 *                 example: plane
 *
 *     responses:
 *       201:
 *         description: Service créé avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs, managers et agents
 *
 *       500:
 *         description: Erreur serveur
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(createServiceSchema),
  serviceController.create
);

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: Liste des services
 *     description: Retourne tous les services disponibles.
 *     tags:
 *       - Services
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
 *                   example: Services retrieved successfully
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
 *                       name:
 *                         type: string
 *                         example: Billetterie
 *
 *                       initial:
 *                         type: string
 *                         example: BIL
 *
 *                       description:
 *                         type: string
 *                         example: Gestion des billets
 *
 *                       color:
 *                         type: string
 *                         example: "#2563EB"
 *
 *                       icon:
 *                         type: string
 *                         example: plane
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T12:50:38.156Z
 *
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T12:50:38.156Z
 *
 *       401:
 *         description: Non authentifié
 *
 *       500:
 *         description: Erreur serveur
 */

router.get(
  '/',
  authMiddleware,
  serviceController.findAll
);

/**
 * @openapi
 * /api/services/{id}:
 *   put:
 *     summary: Modifier un service
 *     description: Met à jour les informations d'un service.
 *     tags:
 *       - Services
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du service
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
 *               name:
 *                 type: string
 *                 example: Billetterie
 *
 *               description:
 *                 type: string
 *                 example: Gestion des billets internationaux
 *
 *               color:
 *                 type: string
 *                 example: "#2563EB"
 *
 *               icon:
 *                 type: string
 *                 example: plane
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Service modifié avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs, managers et agents
 *
 *       404:
 *         description: Service introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(updateServiceSchema),
  serviceController.update
);

/**
 * @openapi
 * /api/services/{id}:
 *   delete:
 *     summary: Supprimer un service
 *     description: Effectue une suppression logique d'un service.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du service
 *     responses:
 *       200:
 *         description: Service supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *       404:
 *         description: Service introuvable
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  serviceController.delete
);

export default router;