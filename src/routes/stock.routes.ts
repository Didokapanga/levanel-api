import { Router } from 'express';

import { StockController }
from '../controllers/stock.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createStockSchema,
  updateStockSchema
}
from '../validations/stock.validation';

const router = Router();

const stockController =
  new StockController();

/**
 * @openapi
 * tags:
 *   - name: Stocks
 *     description: Gestion des stocks de billets associés aux contrats partenaires
 */

/**
 * @openapi
 * /api/stocks:
 *   post:
 *     summary: Créer un stock
 *     description: Crée un nouveau stock associé à un contrat de type stock_only ou caution_stock.
 *     tags:
 *       - Stocks
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - contract_id
 *               - amount_initial
 *               - currency
 *
 *             properties:
 *
 *               contract_id:
 *                 type: string
 *                 format: uuid
 *                 example: CONTRACT_UUID
 *
 *               amount_initial:
 *                 type: number
 *                 example: 10000
 *
 *               currency:
 *                 type: string
 *                 example: USD
 *
 *               purchased_at:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-21
 *
 *               notes:
 *                 type: string
 *                 example: Stock principal émission billets
 *
 *     responses:
 *       201:
 *         description: Stock créé avec succès
 *
 *       400:
 *         description: Contrat invalide ou données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
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
  roleMiddleware('admin', 'manager'),
  validate(createStockSchema),
  stockController.create
);

/**
 * @openapi
 * /api/stocks:
 *   get:
 *     summary: Liste des stocks
 *     description: Retourne la liste paginée des stocks avec filtres de recherche.
 *     tags:
 *       - Stocks
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
 *           example: congo airways
 *         description: Recherche sur les stocks
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
 *                   example: Stocks retrieved successfully
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
 *                             example: "10000.00"
 *
 *                           amount_remaining:
 *                             type: string
 *                             example: "10000.00"
 *
 *                           currency:
 *                             type: string
 *                             example: USD
 *
 *                           purchased_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-20T23:00:00.000Z
 *
 *                           notes:
 *                             type: string
 *                             example: Stock principal émission billets
 *
 *                           is_active:
 *                             type: boolean
 *                             example: true
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-21T15:09:23.566Z
 *
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-21T15:09:23.566Z
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
  stockController.findAll
);

/**
 * @openapi
 * /api/stocks/{id}:
 *   put:
 *     summary: Modifier un stock
 *     description: Met à jour un stock. Un stock dont le montant restant atteint zéro est automatiquement désactivé.
 *     tags:
 *       - Stocks
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du stock
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
 *               amount_remaining:
 *                 type: number
 *                 example: 8500
 *
 *               notes:
 *                 type: string
 *                 example: Ajustement après émission
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Stock modifié avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *
 *       404:
 *         description: Stock introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateStockSchema),
  stockController.update
);

/**
 * @openapi
 * /api/stocks/{id}:
 *   delete:
 *     summary: Supprimer un stock
 *     description: Effectue une suppression logique d'un stock.
 *     tags:
 *       - Stocks
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du stock
 *
 *     responses:
 *       200:
 *         description: Stock supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *
 *       404:
 *         description: Stock introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  stockController.delete
);

export default router;