import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceRequestItemSchema
}
from '../validations/service-request-item.validation';

import {
  updateServiceRequestItemSchema
}
from '../validations/service-request-item.validation';

import { ServiceRequestItemController }
from '../controllers/service-request-item.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new ServiceRequestItemController();

/**
 * @openapi
 * tags:
 *   - name: Service Request Items
 *     description: Gestion des éléments associés aux demandes de services (billets, réservations, prestations)
 */

/**
 * @openapi
 * /api/service-request-items:
 *   post:
 *     summary: Créer un élément de demande
 *     description: Ajoute un billet ou une prestation à une demande de service.
 *     tags:
 *       - Service Request Items
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
 *               - item_type
 *               - customer_name
 *
 *             properties:
 *
 *               request_id:
 *                 type: string
 *                 format: uuid
 *                 example: 74fc86a4-f66f-4e8e-a047-684c23033355
 *
 *               item_type:
 *                 type: string
 *                 example: ticket
 *
 *               customer_name:
 *                 type: string
 *                 example: John Doe
 *
 *               airline_id:
 *                 type: string
 *                 format: uuid
 *                 example: 0cac5b29-f6e7-4a51-a60a-24172182177a
 *
 *               system_id:
 *                 type: string
 *                 format: uuid
 *                 example: 03a1b653-0a8b-4d59-b2e5-02a351d7bdb6
 *
 *               ticket_number:
 *                 type: string
 *                 example: 0821234567890
 *
 *               pnr:
 *                 type: string
 *                 example: KQ82LP
 *
 *               route:
 *                 type: string
 *                 example: Kinshasa - Bruxelles
 *
 *               travel_class:
 *                 type: string
 *                 example: Economy
 *
 *               departure_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-06-15T08:00:00Z
 *
 *               issued_at:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-22T10:00:00Z
 *
 *               tht_amount:
 *                 type: number
 *                 example: 800
 *
 *               tax_amount:
 *                 type: number
 *                 example: 150
 *
 *               partner_service_fee:
 *                 type: number
 *                 example: 0
 *
 *               service_fee:
 *                 type: number
 *                 example: 0
 *
 *               commission_amount:
 *                 type: number
 *                 example: 25.7
 *
 *               notes:
 *                 type: string
 *                 example: Mission entreprise
 *
 *     responses:
 *       201:
 *         description: Élément créé avec succès
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
    createServiceRequestItemSchema
  ),
  controller.create
);

/**
 * @openapi
 * /api/service-request-items:
 *   get:
 *     summary: Liste des éléments de demandes
 *     description: Retourne la liste paginée des éléments liés aux demandes de services.
 *     tags:
 *       - Service Request Items
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
 *           example: 0821234567890
 *         description: Recherche par ticket, client, PNR ou référence
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
 *                   example: Items retrieved successfully
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
 *                           item_reference:
 *                             type: string
 *                             example: ITEM-1779454549397-3740
 *
 *                           item_type:
 *                             type: string
 *                             example: ticket
 *
 *                           item_status:
 *                             type: string
 *                             example: active
 *
 *                           customer_name:
 *                             type: string
 *                             example: John Doe
 *
 *                           airline_id:
 *                             type: string
 *                             format: uuid
 *
 *                           system_id:
 *                             type: string
 *                             format: uuid
 *
 *                           ticket_number:
 *                             type: string
 *                             example: 0821234567890
 *
 *                           pnr:
 *                             type: string
 *                             example: KQ82LP
 *
 *                           route:
 *                             type: string
 *                             example: Kinshasa - Bruxelles
 *
 *                           travel_class:
 *                             type: string
 *                             example: Economy
 *
 *                           departure_date:
 *                             type: string
 *                             format: date-time
 *
 *                           issued_at:
 *                             type: string
 *                             format: date-time
 *
 *                           tht_amount:
 *                             type: string
 *                             example: "800.00"
 *
 *                           tax_amount:
 *                             type: string
 *                             example: "150.00"
 *
 *                           partner_service_fee:
 *                             type: string
 *                             example: "0.00"
 *
 *                           service_fee:
 *                             type: string
 *                             example: "0.00"
 *
 *                           cancellation_fee:
 *                             type: string
 *                             example: "0.00"
 *
 *                           modification_fee:
 *                             type: string
 *                             example: "0.00"
 *
 *                           commission_amount:
 *                             type: string
 *                             example: "25.70"
 *
 *                           ttc_amount:
 *                             type: string
 *                             example: "950.00"
 *
 *                           debit_balance:
 *                             type: string
 *                             example: "924.30"
 *
 *                           notes:
 *                             type: string
 *                             example: Mission entreprise
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *
 *                     total:
 *                       type: integer
 *                       example: 2
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
 * /api/service-request-items/{id}:
 *   put:
 *     summary: Modifier un élément
 *     description: Met à jour un billet ou une prestation associée à une demande.
 *     tags:
 *       - Service Request Items
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de l'élément
 *
 *     responses:
 *       200:
 *         description: Élément modifié avec succès
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
 *         description: Élément introuvable
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
    updateServiceRequestItemSchema
  ),
  controller.update
);

/**
 * @openapi
 * /api/service-request-items/{id}:
 *   delete:
 *     summary: Supprimer un élément
 *     description: Effectue une suppression logique d'un élément de demande.
 *     tags:
 *       - Service Request Items
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de l'élément
 *
 *     responses:
 *       200:
 *         description: Élément supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs
 *
 *       404:
 *         description: Élément introuvable
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