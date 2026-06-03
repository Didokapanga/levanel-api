import { Router } from 'express';

import { ContractController }
from '../controllers/contract.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createContractSchema,
  updateContractSchema
}
from '../validations/contract.validation';

const router = Router();

const contractController =
  new ContractController();

/**
 * @openapi
 * tags:
 *   - name: Contracts
 *     description: Gestion des contrats partenaires
 */

/**
 * @openapi
 * /api/contracts:
 *   post:
 *     summary: Créer un contrat
 *     description: Crée un nouveau contrat associé à un partenaire.
 *     tags:
 *       - Contracts
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - partner_id
 *               - contract_type
 *               - status
 *               - start_date
 *
 *             properties:
 *
 *               partner_id:
 *                 type: string
 *                 format: uuid
 *                 example: PARTNER_UUID
 *
 *               contract_type:
 *                 type: string
 *                 example: caution_stock
 *                 description: caution_only, stock_only ou caution_stock
 *
 *               status:
 *                 type: string
 *                 example: active
 *
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-20
 *
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2027-05-20
 *
 *               description:
 *                 type: string
 *                 example: Contrat principal billetterie
 *
 *     responses:
 *       201:
 *         description: Contrat créé avec succès
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
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(createContractSchema),
  contractController.create
);

/**
 * @openapi
 * /api/contracts:
 *   get:
 *     summary: Liste des contrats
 *     description: Retourne la liste paginée des contrats.
 *     tags:
 *       - Contracts
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
 *           example: billetterie
 *         description: Recherche sur les contrats
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
 *                   example: Contracts retrieved successfully
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
 *                           partner_id:
 *                             type: string
 *                             format: uuid
 *
 *                           contract_type:
 *                             type: string
 *                             example: caution_stock
 *
 *                           status:
 *                             type: string
 *                             example: active
 *
 *                           start_date:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-19T23:00:00.000Z
 *
 *                           end_date:
 *                             type: string
 *                             format: date-time
 *                             example: 2027-05-19T23:00:00.000Z
 *
 *                           description:
 *                             type: string
 *                             example: Contrat principal billetterie
 *
 *                           is_active:
 *                             type: boolean
 *                             example: true
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-20T14:24:15.119Z
 *
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-20T14:24:15.119Z
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
  contractController.findAll
);

/**
 * @openapi
 * /api/contracts/{id}:
 *   put:
 *     summary: Modifier un contrat
 *     description: Met à jour les informations d'un contrat.
 *     tags:
 *       - Contracts
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du contrat
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
 *               contract_type:
 *                 type: string
 *                 example: caution_stock
 *
 *               status:
 *                 type: string
 *                 example: active
 *
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-20
 *
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2027-05-20
 *
 *               description:
 *                 type: string
 *                 example: Contrat principal billetterie
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Contrat modifié avec succès
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
 *         description: Contrat introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(updateContractSchema),
  contractController.update
);

/**
 * @openapi
 * /api/contracts/{id}:
 *   delete:
 *     summary: Supprimer un contrat
 *     description: Effectue une suppression logique d'un contrat.
 *     tags:
 *       - Contracts
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du contrat
 *
 *     responses:
 *       200:
 *         description: Contrat supprimé avec succès
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

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  contractController.delete
);

export default router;