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
import { createItemCancellationSchema } from '../validations/create-item-cancellation.schema';
import { createItemModificationSchema } from '../validations/create-item-modification.schema';

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
 * /api/service-request-items/modification:
 *   post:
 *     summary: Créer une modification de billet
 *     description: |
 *       Enregistre une modification sur un billet existant.
 *
 *       Cette opération :
 *       - crée un item de type modification
 *       - rattache l'opération au billet d'origine
 *       - met le billet parent au statut modified
 *       - génère les écritures comptables associées
 *
 *       Seuls les billets ayant le statut active peuvent être modifiés.
 *
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
 *               - parent_item_id
 *               - modification_fee
 *
 *             properties:
 *
 *               parent_item_id:
 *                 type: string
 *                 format: uuid
 *                 example: 2d6fc8c5-0b40-4c8a-b8b8-70cfc2e6f845
 *
 *               modification_fee:
 *                 type: number
 *                 example: 50
 *
 *               debit_balance:
 *                 type: number
 *                 example: 35
 *                 description: Montant supplémentaire dû au partenaire
 *
 *               route:
 *                 type: string
 *                 example: KIN-BRU
 *
 *               travel_class:
 *                 type: string
 *                 example: Business
 *
 *               departure_date:
 *                 type: string
 *                 format: date-time
 *
 *               notes:
 *                 type: string
 *                 example: Changement de date demandé par le client
 *
 *     responses:
 *       201:
 *         description: Modification enregistrée avec succès
 *
 *       400:
 *         description: Données invalides ou billet non modifiable
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Billet introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/modification',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createItemModificationSchema
  ),
  controller.createModification
);

/**
 * @openapi
 * /api/service-request-items/cancellation:
 *   post:
 *     summary: Créer une annulation de billet
 *     description: |
 *       Enregistre une annulation sur un billet existant.
 *
 *       Cette opération :
 *       - crée un item de type cancellation
 *       - rattache l'opération au billet d'origine
 *       - met le billet parent au statut cancelled
 *       - calcule automatiquement le remboursement client
 *       - génère les écritures comptables associées
 *
 *       Seuls les billets ayant le statut active peuvent être annulés.
 *
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
 *               - parent_item_id
 *               - airline_penalty
 *
 *             properties:
 *
 *               parent_item_id:
 *                 type: string
 *                 format: uuid
 *                 example: 2d6fc8c5-0b40-4c8a-b8b8-70cfc2e6f845
 *
 *               airline_penalty:
 *                 type: number
 *                 example: 150
 *                 description: Montant retenu par la compagnie aérienne
 *
 *               cancellation_fee:
 *                 type: number
 *                 example: 30
 *                 description: Frais d'annulation prélevés par l'agence
 *
 *               notes:
 *                 type: string
 *                 example: Annulation demandée par le client
 *
 *     responses:
 *       201:
 *         description: Annulation enregistrée avec succès
 *
 *       400:
 *         description: Données invalides ou billet non annulable
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès refusé
 *
 *       404:
 *         description: Billet introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/cancellation',
  authMiddleware,
  roleMiddleware('admin', 'manager', 'agent'),
  validate(
    createItemCancellationSchema
  ),
  controller.createCancellation
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
 * /api/service-request-items/request/{id}:
 *   get:
 *     summary: Liste des éléments d'une demande de service
 *     description: Retourne tous les éléments (billets ou prestations) associés à une demande de service spécifique.
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
 *         description: Identifiant de la demande de service
 *
 *     responses:
 *       200:
 *         description: Éléments récupérés avec succès
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
 *                       request_id:
 *                         type: string
 *                         format: uuid
 *
 *                       item_reference:
 *                         type: string
 *                         example: ITEM-1779454549397-3740
 *
 *                       item_type:
 *                         type: string
 *                         example: ticket
 *
 *                       item_status:
 *                         type: string
 *                         example: active
 *
 *                       customer_name:
 *                         type: string
 *                         example: John Doe
 *
 *                       airline_name:
 *                         type: string
 *                         example: Ethiopian Airlines
 *
 *                       system_name:
 *                         type: string
 *                         example: Amadeus
 *
 *                       ticket_number:
 *                         type: string
 *                         example: 0821234567890
 *
 *                       pnr:
 *                         type: string
 *                         example: KQ82LP
 *
 *                       route:
 *                         type: string
 *                         example: Kinshasa - Bruxelles
 *
 *                       travel_class:
 *                         type: string
 *                         example: Economy
 *
 *                       departure_date:
 *                         type: string
 *                         format: date-time
 *
 *                       issued_at:
 *                         type: string
 *                         format: date-time
 *
 *                       tht_amount:
 *                         type: string
 *                         example: "800.00"
 *
 *                       tax_amount:
 *                         type: string
 *                         example: "150.00"
 *
 *                       partner_service_fee:
 *                         type: string
 *                         example: "0.00"
 *
 *                       service_fee:
 *                         type: string
 *                         example: "20.00"
 *
 *                       commission_amount:
 *                         type: string
 *                         example: "25.70"
 *
 *                       ttc_amount:
 *                         type: string
 *                         example: "970.00"
 *
 *                       debit_balance:
 *                         type: string
 *                         example: "944.30"
 *
 *                       notes:
 *                         type: string
 *                         example: Mission entreprise
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *
 *       401:
 *         description: Non authentifié
 *
 *       404:
 *         description: Demande de service introuvable
 *
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/request/:id',
  authMiddleware,
  controller.getByRequest
);

router.get(
  '/request/:id',
  authMiddleware,
  controller.getByRequest
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