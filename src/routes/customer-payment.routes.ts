import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createCustomerPaymentSchema,
  updateCustomerPaymentSchema
}
from '../validations/customer-payment.validation';

import { CustomerPaymentController }
from '../controllers/customer-payment.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new CustomerPaymentController();

/**
 * @openapi
 * tags:
 *   - name: Customer Payments
 *     description: Gestion des paiements et remboursements clients
 */

/**
 * @openapi
 * /api/customer-payments:
 *   post:
 *     summary: Enregistrer un paiement client
 *     description: Enregistre un paiement ou un remboursement associé à une demande de service.
 *     tags:
 *       - Customer Payments
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - request_id
 *               - payment_method
 *               - payment_type
 *               - amount
 *               - currency
 *
 *             properties:
 *
 *               request_id:
 *                 type: string
 *                 format: uuid
 *                 example: REQUEST_UUID
 *
 *               payment_method:
 *                 type: string
 *                 example: cash
 *
 *               payment_type:
 *                 type: string
 *                 example: payment
 *                 description: payment ou refund
 *
 *               amount:
 *                 type: number
 *                 example: 500
 *
 *               currency:
 *                 type: string
 *                 example: USD
 *
 *               observation:
 *                 type: string
 *                 example: Premier acompte
 *
 *     responses:
 *       201:
 *         description: Paiement enregistré avec succès
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
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createCustomerPaymentSchema
  ),
  controller.create
);

/**
 * @openapi
 * /api/customer-payments:
 *   get:
 *     summary: Liste des paiements clients
 *     description: Retourne la liste paginée des paiements et remboursements enregistrés.
 *     tags:
 *       - Customer Payments
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: PAY-1779456533364-7560
 *         description: Recherche par référence de paiement
 *
 *       - in: query
 *         name: payment_type
 *         schema:
 *           type: string
 *           example: payment
 *         description: payment ou refund
 *
 *     responses:
 *       200:
 *         description: Paiements récupérés avec succès
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
 *                   example: Payments retrieved successfully
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
 *                           request_id:
 *                             type: string
 *                             format: uuid
 *
 *                           payment_reference:
 *                             type: string
 *                             example: PAY-1779456533364-7560
 *
 *                           payment_method:
 *                             type: string
 *                             example: cash
 *
 *                           payment_type:
 *                             type: string
 *                             example: payment
 *
 *                           amount:
 *                             type: string
 *                             example: "500.00"
 *
 *                           currency:
 *                             type: string
 *                             example: USD
 *
 *                           payment_date:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-22T13:28:53.408Z
 *
 *                           observation:
 *                             type: string
 *                             example: Premier acompte
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-22T13:28:53.408Z
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
  controller.findAll
);

/**
 * @openapi
 * /api/customer-payments/{id}:
 *   put:
 *     summary: Modifier un paiement client
 *     description: Met à jour les informations d'un paiement ou remboursement.
 *     tags:
 *       - Customer Payments
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du paiement
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
 *               payment_method:
 *                 type: string
 *                 example: bank_transfer
 *
 *               amount:
 *                 type: number
 *                 example: 750
 *
 *               observation:
 *                 type: string
 *                 example: Paiement corrigé après rapprochement bancaire
 *
 *     responses:
 *       200:
 *         description: Paiement modifié avec succès
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
 *         description: Paiement introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    updateCustomerPaymentSchema
  ),
  controller.update
);

/**
 * @openapi
 * /api/customer-payments/{id}:
 *   delete:
 *     summary: Supprimer un paiement client
 *     description: Effectue une suppression logique d'un paiement ou remboursement.
 *     tags:
 *       - Customer Payments
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du paiement
 *
 *     responses:
 *       200:
 *         description: Paiement supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Paiement introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  controller.delete
);

export default router;