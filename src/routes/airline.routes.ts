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

/**
 * @openapi
 * tags:
 *   - name: Airlines
 *     description: Gestion des compagnies aériennes
 */

/**
 * @openapi
 * /api/airlines:
 *   post:
 *     summary: Créer une compagnie aérienne
 *     description: Crée une nouvelle compagnie aérienne.
 *     tags:
 *       - Airlines
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - code
 *               - name
 *               - country
 *
 *             properties:
 *               code:
 *                 type: string
 *                 example: ET
 *                 description: Code IATA ou code interne de la compagnie
 *
 *               name:
 *                 type: string
 *                 example: Ethiopian Airlines
 *
 *               country:
 *                 type: string
 *                 example: Ethiopia
 *
 *     responses:
 *       201:
 *         description: Compagnie créée avec succès
 *
 *       400:
 *         description: Code compagnie déjà existant ou données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Réservé aux administrateurs
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  validate(createAirlineSchema),
  airlineController.create
);

/**
 * @openapi
 * /api/airlines:
 *   get:
 *     summary: Liste des compagnies aériennes
 *     description: Retourne la liste de toutes les compagnies aériennes actives.
 *     tags:
 *       - Airlines
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
 *                   example: Airlines retrieved successfully
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
 *                       code:
 *                         type: string
 *                         example: ET
 *
 *                       name:
 *                         type: string
 *                         example: Ethiopian Airlines
 *
 *                       logo:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *
 *                       country:
 *                         type: string
 *                         example: Ethiopia
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:13:57.777Z
 *
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:13:57.777Z
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
  airlineController.findAll
);

/**
 * @openapi
 * /api/airlines/{id}:
 *   put:
 *     summary: Modifier une compagnie aérienne
 *     description: Met à jour les informations d'une compagnie aérienne.
 *     tags:
 *       - Airlines
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de la compagnie aérienne
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               code:
 *                 type: string
 *                 example: ET
 *
 *               name:
 *                 type: string
 *                 example: Ethiopian Airlines
 *
 *               country:
 *                 type: string
 *                 example: Ethiopia
 *
 *     responses:
 *       200:
 *         description: Compagnie modifiée avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Réservé aux administrateurs
 *
 *       404:
 *         description: Compagnie introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validate(updateAirlineSchema),
  airlineController.update
);

/**
 * @openapi
 * /api/airlines/{id}:
 *   delete:
 *     summary: Supprimer une compagnie aérienne
 *     description: Effectue une suppression logique d'une compagnie aérienne.
 *     tags:
 *       - Airlines
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de la compagnie aérienne
 *
 *     responses:
 *       200:
 *         description: Compagnie supprimée avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Réservé aux administrateurs
 *
 *       404:
 *         description: Compagnie introuvable
 *
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  airlineController.delete
);

export default router;