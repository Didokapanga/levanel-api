import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createTicketAdjustmentSchema,
  updateTicketAdjustmentSchema
}
from '../validations/ticket-adjustment.validation';

import { TicketAdjustmentController }
from '../controllers/ticket-adjustment.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new TicketAdjustmentController();

/**
 * @openapi
 * tags:
 *   - name: Ticket Adjustments
 *     description: Gestion des modifications, remboursements et ajustements de billets
 */

/**
 * @openapi
 * /api/ticket-adjustments:
 *   post:
 *     summary: Créer un ajustement de billet
 *     description: Crée un ajustement lié à un billet existant (modification, remboursement ou autre ajustement).
 *     tags:
 *       - Ticket Adjustments
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - item_id
 *               - adjustment_type
 *
 *             properties:
 *
 *               item_id:
 *                 type: string
 *                 format: uuid
 *                 example: UUID
 *
 *               adjustment_type:
 *                 type: string
 *                 example: modification
 *
 *               airline_fee:
 *                 type: number
 *                 example: 100
 *
 *               agency_fee:
 *                 type: number
 *                 example: 30
 *
 *               refund_amount:
 *                 type: number
 *                 example: 0
 *
 *               new_debit_balance:
 *                 type: number
 *                 example: 900
 *
 *               notes:
 *                 type: string
 *                 example: Modification date de voyage
 *
 *     responses:
 *       201:
 *         description: Ajustement créé avec succès
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
  validate(
    createTicketAdjustmentSchema
  ),
  controller.create
);

/**
 * @openapi
 * /api/ticket-adjustments:
 *   get:
 *     summary: Liste des ajustements
 *     description: Retourne la liste paginée des ajustements de billets.
 *     tags:
 *       - Ticket Adjustments
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
 *         name: adjustment_type
 *         schema:
 *           type: string
 *           example: modification
 *         description: Filtrer par type d'ajustement
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: ET1234567890
 *         description: Recherche par numéro de billet, client, PNR ou référence d'ajustement
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
 *                   example: Adjustments retrieved successfully
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
 *                           item_id:
 *                             type: string
 *                             format: uuid
 *
 *                           adjustment_reference:
 *                             type: string
 *                             example: ADJ-20260521-001
 *
 *                           adjustment_type:
 *                             type: string
 *                             example: modification
 *
 *                           ticket_number:
 *                             type: string
 *                             example: ET1234567890
 *
 *                           customer_name:
 *                             type: string
 *                             example: John Doe
 *
 *                           pnr:
 *                             type: string
 *                             example: ABC123
 *
 *                           airline_fee:
 *                             type: number
 *                             example: 100
 *
 *                           agency_fee:
 *                             type: number
 *                             example: 30
 *
 *                           refund_amount:
 *                             type: number
 *                             example: 0
 *
 *                           new_debit_balance:
 *                             type: number
 *                             example: 900
 *
 *                           notes:
 *                             type: string
 *                             example: Modification date de voyage
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *
 *                     total:
 *                       type: integer
 *                       example: 0
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
 *                       example: 0
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
  controller.findAll
);

/**
 * @openapi
 * /api/ticket-adjustments/{id}:
 *   put:
 *     summary: Modifier un ajustement
 *     description: Met à jour les frais et informations d'un ajustement existant.
 *     tags:
 *       - Ticket Adjustments
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de l'ajustement
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
 *               airline_fee:
 *                 type: number
 *                 example: 150
 *
 *               agency_fee:
 *                 type: number
 *                 example: 50
 *
 *               refund_amount:
 *                 type: number
 *                 example: 0
 *
 *               new_debit_balance:
 *                 type: number
 *                 example: 850
 *
 *               notes:
 *                 type: string
 *                 example: Ajustement après modification du billet
 *
 *     responses:
 *       200:
 *         description: Ajustement modifié avec succès
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
 *         description: Ajustement introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(
    'admin',
    'manager'
  ),
  validate(
    updateTicketAdjustmentSchema
  ),
  controller.update
);

/**
 * @openapi
 * /api/ticket-adjustments/{id}:
 *   delete:
 *     summary: Supprimer un ajustement
 *     description: Effectue une suppression logique d'un ajustement.
 *     tags:
 *       - Ticket Adjustments
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de l'ajustement
 *
 *     responses:
 *       200:
 *         description: Ajustement supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs
 *
 *       404:
 *         description: Ajustement introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(
    'admin'
  ),
  controller.delete
);

export default router;