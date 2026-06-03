import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { FinancialLedgerController }
from '../controllers/financial-ledger.controller';

const router = Router();

const controller =
  new FinancialLedgerController();

/**
 * @openapi
 * tags:
 *   - name: Financial Ledger
 *     description: Consultation des écritures comptables et mouvements financiers
 */

/**
 * @openapi
 * /api/financial-ledger:
 *   get:
 *     summary: Liste des écritures comptables
 *     description: Retourne la liste paginée des mouvements financiers enregistrés dans le grand livre.
 *     tags:
 *       - Financial Ledger
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
 *           example: LEDGER-001
 *
 *       - in: query
 *         name: request_reference
 *         schema:
 *           type: string
 *           example: SR-1779449061291-1711
 *
 *       - in: query
 *         name: entry_type
 *         schema:
 *           type: string
 *           example: revenue
 *
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           example: income
 *
 *     responses:
 *       200:
 *         description: Écritures récupérées avec succès
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
 *                   example: Financial ledger retrieved successfully
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
 *                           item_id:
 *                             type: string
 *                             format: uuid
 *                             nullable: true
 *
 *                           payment_id:
 *                             type: string
 *                             format: uuid
 *                             nullable: true
 *
 *                           service_id:
 *                             type: string
 *                             format: uuid
 *
 *                           partner_id:
 *                             type: string
 *                             format: uuid
 *
 *                           client_id:
 *                             type: string
 *                             format: uuid
 *
 *                           contract_id:
 *                             type: string
 *                             format: uuid
 *
 *                           ledger_reference:
 *                             type: string
 *                             example: LEDGER-20260522-001
 *
 *                           request_reference:
 *                             type: string
 *                             example: SR-1779449061291-1711
 *
 *                           source_module:
 *                             type: string
 *                             example: customer_payment
 *
 *                           operation_type:
 *                             type: string
 *                             example: payment
 *
 *                           entry_type:
 *                             type: string
 *                             example: revenue
 *
 *                           direction:
 *                             type: string
 *                             example: income
 *
 *                           amount:
 *                             type: string
 *                             example: "500.00"
 *
 *                           currency:
 *                             type: string
 *                             example: USD
 *
 *                           client_name:
 *                             type: string
 *                             example: Equity BCDC
 *
 *                           service_name:
 *                             type: string
 *                             example: Billetterie
 *
 *                           partner_name:
 *                             type: string
 *                             example: Congo Airways
 *
 *                           description:
 *                             type: string
 *                             example: Paiement client enregistré
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *
 *                     total:
 *                       type: integer
 *                       example: 25
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
 *                       example: 3
 */

router.get(
  '/',
  authMiddleware,
  controller.findAll
);

/**
 * @openapi
 * /api/financial-ledger/{id}:
 *   get:
 *     summary: Détail d'une écriture comptable
 *     description: Retourne les informations détaillées d'une écriture du grand livre financier.
 *     tags:
 *       - Financial Ledger
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de l'écriture comptable
 *
 *     responses:
 *       200:
 *         description: Écriture récupérée avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       404:
 *         description: Écriture introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.get(
  '/:id',
  authMiddleware,
  controller.findById
);

export default router;