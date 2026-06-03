import { Router } from 'express';

import { CautionController }
from '../controllers/caution.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createCautionSchema,
  updateCautionSchema
}
from '../validations/caution.validation';

const router = Router();

const cautionController =
  new CautionController();

/**
 * @openapi
 * tags:
 *   - name: Cautions
 *     description: Gestion des cautions liées aux contrats partenaires
 */

/**
 * @openapi
 * /api/cautions:
 *   post:
 *     summary: Créer une caution
 *     description: Crée une nouvelle caution associée à un contrat de type caution_only ou caution_stock.
 *     tags:
 *       - Cautions
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contract_id
 *               - amount_initial
 *               - currency
 *
 *             properties:
 *               contract_id:
 *                 type: string
 *                 format: uuid
 *                 example: CONTRACT_UUID
 *
 *               amount_initial:
 *                 type: number
 *                 example: 5000
 *
 *               currency:
 *                 type: string
 *                 example: USD
 *
 *               deposited_at:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-20
 *
 *               notes:
 *                 type: string
 *                 example: Caution principale Ethiopian Airlines
 *
 *     responses:
 *       201:
 *         description: Caution créée avec succès
 *
 *       400:
 *         description: Contrat invalide ou données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs, managers et comptables
 *
 *       404:
 *         description: Contrat introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'accountant'),
  validate(createCautionSchema),
  cautionController.create
);

/**
 * @openapi
 * /api/cautions:
 *   get:
 *     summary: Liste des cautions
 *     description: Retourne la liste paginée des cautions avec filtres de recherche.
 *     tags:
 *       - Cautions
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Numéro de page
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Nombre d'éléments par page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: ethiopian
 *         description: Recherche sur les cautions
 *
 *       - in: query
 *         name: contract_type
 *         schema:
 *           type: string
 *           example: caution_stock
 *         description: Filtrer par type de contrat
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
 *                   example: Cautions retrieved successfully
 *
 *                 data:
 *                   type: object
 *
 *                   properties:
 *
 *                     data:
 *                       type: array
 *
 *                       items:
 *                         type: object
 *
 *                         properties:
 *
 *                           id:
 *                             type: string
 *                             format: uuid
 *
 *                           contract_id:
 *                             type: string
 *                             format: uuid
 *
 *                           partner_name:
 *                             type: string
 *                             example: Congo Airways
 *
 *                           contract_type:
 *                             type: string
 *                             example: caution_stock
 *
 *                           amount_initial:
 *                             type: string
 *                             example: "5000.00"
 *
 *                           amount_remaining:
 *                             type: string
 *                             example: "5000.00"
 *
 *                           currency:
 *                             type: string
 *                             example: USD
 *
 *                           deposited_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-19T23:00:00.000Z
 *
 *                           notes:
 *                             type: string
 *                             example: Caution principale Ethiopian Airlines
 *
 *                           is_active:
 *                             type: boolean
 *                             example: true
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-21T14:56:57.528Z
 *
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-21T14:56:57.528Z
 *
 *                     total:
 *                       type: integer
 *                       example: 1
 *
 *                     page:
 *                       type: integer
 *                       example: 1
 *
 *                     limit:
 *                       type: integer
 *                       example: 10
 *
 *                     total_pages:
 *                       type: integer
 *                       example: 1
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
  cautionController.findAll
);

/**
 * @openapi
 * /api/cautions/{id}:
 *   put:
 *     summary: Modifier une caution
 *     description: Met à jour une caution. Une caution dont le montant restant atteint zéro est automatiquement désactivée.
 *     tags:
 *       - Cautions
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la caution
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               amount_remaining:
 *                 type: number
 *                 example: 4200
 *
 *               notes:
 *                 type: string
 *                 example: Mise à jour après émission
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Caution modifiée avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs, managers et comptables
 *
 *       404:
 *         description: Caution introuvable
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'accountant'),
  validate(updateCautionSchema),
  cautionController.update
);

/**
 * @openapi
 * /api/cautions/{id}:
 *   delete:
 *     summary: Supprimer une caution
 *     description: Effectue une suppression logique d'une caution.
 *     tags:
 *       - Cautions
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la caution
 *
 *     responses:
 *       200:
 *         description: Caution supprimée avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *
 *       404:
 *         description: Caution introuvable
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  cautionController.delete
);

export default router;