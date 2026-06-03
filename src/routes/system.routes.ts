import { Router } from 'express';

import { SystemController }
from '../controllers/system.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createSystemSchema,
  updateSystemSchema
}
from '../validations/system.validation';

const router = Router();

const systemController =
  new SystemController();

  /**
 * @openapi
 * tags:
 *   - name: Systems
 *     description: Gestion des systèmes de réservation et plateformes partenaires
 */

/**
 * @openapi
 * /api/systems:
 *   post:
 *     summary: Créer un système
 *     description: Crée un nouveau système de réservation ou plateforme partenaire.
 *     tags:
 *       - Systems
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
 *               - initial
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *                 example: Amadeus
 *
 *               initial:
 *                 type: string
 *                 example: AMA
 *                 description: Code unique du système
 *
 *               description:
 *                 type: string
 *                 example: Global Distribution System
 *
 *     responses:
 *       201:
 *         description: Système créé avec succès
 *
 *       400:
 *         description: Initial déjà existant ou données invalides
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
  validate(createSystemSchema),
  systemController.create
);

/**
 * @openapi
 * /api/systems:
 *   get:
 *     summary: Liste des systèmes
 *     description: Retourne tous les systèmes enregistrés.
 *     tags:
 *       - Systems
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
 *                   example: Systems retrieved successfully
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
 *                         example: Amadeus
 *
 *                       initial:
 *                         type: string
 *                         example: AMA
 *
 *                       description:
 *                         type: string
 *                         example: Global Distribution System
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:04:58.623Z
 *
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:04:58.623Z
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
  systemController.findAll
);

/**
 * @openapi
 * /api/systems/{id}:
 *   put:
 *     summary: Modifier un système
 *     description: Met à jour les informations d'un système.
 *     tags:
 *       - Systems
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du système
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
 *                 example: Amadeus
 *
 *               initial:
 *                 type: string
 *                 example: AMA
 *
 *               description:
 *                 type: string
 *                 example: Global Distribution System
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Système modifié avec succès
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
 *         description: Système introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(updateSystemSchema),
  systemController.update
);

/**
 * @openapi
 * /api/systems/{id}:
 *   delete:
 *     summary: Supprimer un système
 *     description: Effectue une suppression logique d'un système.
 *     tags:
 *       - Systems
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du système
 *
 *     responses:
 *       200:
 *         description: Système supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *
 *       404:
 *         description: Système introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  systemController.delete
);

export default router;