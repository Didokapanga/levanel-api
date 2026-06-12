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
 *                 enum:
 *                   - payment
 *                   - refund
 *                 example: payment
 *
 *               amount:
 *                 type: number
 *                 minimum: 0.01
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
 *
 *       201:
 *         description: Paiement enregistré avec succès
 *
 *       400:
 *         description: Violation d'une règle métier
 *         content:
 *           application/json:
 *             examples:
 *
 *               already_paid:
 *                 summary: Dossier déjà soldé
 *                 value:
 *                   success: false
 *                   message: Request is already fully paid
 *
 *               payment_too_large:
 *                 summary: Paiement supérieur au reste à payer
 *                 value:
 *                   success: false
 *                   message: Maximum allowed payment is 500
 *
 *               refund_too_large:
 *                 summary: Remboursement supérieur au montant payé
 *                 value:
 *                   success: false
 *                   message: Maximum refundable amount is 1000
 *
 *               cancelled_request:
 *                 summary: Dossier annulé
 *                 value:
 *                   success: false
 *                   message: Payments cannot be added to a cancelled request
 *
 *               invalid_amount:
 *                 summary: Montant invalide
 *                 value:
 *                   success: false
 *                   message: Payment amount must be greater than zero
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Dossier introuvable
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
  roleMiddleware('admin', 'manager', 'agent'),
  controller.findAll
);

/**
 * @openapi
 * /api/customer-payments/request/{id}:
 *   get:
 *     summary: Liste des paiements d'une demande de service
 *     description: Retourne tous les paiements associés à un dossier spécifique.
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
 *         description: Identifiant de la demande de service
 *
 *     responses:
 *       200:
 *         description: Paiements récupérés avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       404:
 *         description: Dossier introuvable
 */
router.get(
  '/request/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  controller.getByRequest
);

/**
 * @openapi
 * /api/customer-payments/{id}:
 *   put:
 *     summary: Modifier un paiement client
 *     description: Met à jour un paiement client existant. Les remboursements ne peuvent pas être modifiés. Les paiements d'un dossier annulé ou entièrement soldé ne peuvent pas être modifiés.
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
 *                 minimum: 0.01
 *                 example: 750
 *
 *               currency:
 *                 type: string
 *                 example: USD
 *
 *               observation:
 *                 type: string
 *                 example: Paiement corrigé après rapprochement bancaire
 *
 *     responses:
 *
 *       200:
 *         description: Paiement modifié avec succès
 *
 *       400:
 *         description: Violation d'une règle métier
 *         content:
 *           application/json:
 *             examples:
 *
 *               completed_request:
 *                 summary: Dossier soldé
 *                 value:
 *                   success: false
 *                   message: Payments of completed requests cannot be modified
 *
 *               cancelled_request:
 *                 summary: Dossier annulé
 *                 value:
 *                   success: false
 *                   message: Payments of cancelled requests cannot be modified
 *
 *               refund_payment:
 *                 summary: Paiement de type remboursement
 *                 value:
 *                   success: false
 *                   message: Refund payments cannot be modified
 *
 *               invalid_amount:
 *                 summary: Montant invalide
 *                 value:
 *                   success: false
 *                   message: Payment amount must be greater than zero
 *
 *               exceeded_amount:
 *                 summary: Dépassement du montant autorisé
 *                 value:
 *                   success: false
 *                   message: Maximum allowed amount is 500
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Paiement ou dossier introuvable
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
 *     description: Effectue une suppression logique d'un paiement client. Les remboursements, les paiements d'un dossier annulé ou d'un dossier soldé ne peuvent pas être supprimés.
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
 *
 *       200:
 *         description: Paiement supprimé avec succès
 *
 *       400:
 *         description: Violation d'une règle métier
 *         content:
 *           application/json:
 *             examples:
 *
 *               completed_request:
 *                 summary: Dossier soldé
 *                 value:
 *                   success: false
 *                   message: Payments of completed requests cannot be deleted
 *
 *               cancelled_request:
 *                 summary: Dossier annulé
 *                 value:
 *                   success: false
 *                   message: Payments of cancelled requests cannot be deleted
 *
 *               refund_payment:
 *                 summary: Paiement de type remboursement
 *                 value:
 *                   success: false
 *                   message: Refund payments cannot be deleted
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Paiement ou dossier introuvable
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