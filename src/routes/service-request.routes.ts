import { Router }
from 'express';

import { ServiceRequestController }
from '../controllers/service-request.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createServiceRequestSchema,
  updateServiceRequestSchema
}
from '../validations/service-request.validation';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

const controller =
  new ServiceRequestController();

/**
 * @openapi
 * tags:
 *   - name: Service Requests
 *     description: Gestion des demandes de services clients
 */

/**
 * @openapi
 * /api/service-requests:
 *   post:
 *     summary: Créer une demande de service
 *     description: Crée une nouvelle demande de service associée à un client, un service et éventuellement un partenaire.
 *     tags:
 *       - Service Requests
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - client_id
 *               - service_id
 *               - request_type
 *               - currency
 *
 *             properties:
 *
 *               client_id:
 *                 type: string
 *                 format: uuid
 *                 example: CLIENT_UUID
 *
 *               service_id:
 *                 type: string
 *                 format: uuid
 *                 example: SERVICE_UUID
 *
 *               partner_id:
 *                 type: string
 *                 format: uuid
 *                 example: PARTNER_UUID
 *
 *               contract_id:
 *                 type: string
 *                 format: uuid
 *                 example: CONTRACT_UUID
 *
 *               request_type:
 *                 type: string
 *                 example: ticketing
 *
 *               currency:
 *                 type: string
 *                 example: USD
 *
 *               observation:
 *                 type: string
 *                 example: Mission Bruxelles juin 2026
 *
 *     responses:
 *       201:
 *         description: Demande créée avec succès
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
    createServiceRequestSchema
  ),
  controller.create
);

/**
 * @openapi
 * /api/service-requests:
 *   get:
 *     summary: Liste des demandes de services
 *     description: Retourne la liste paginée des demandes de services.
 *     tags:
 *       - Service Requests
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
 *           example: Bruxelles
 *         description: Recherche par référence, client ou observation
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: pending
 *         description: Filtrer par statut
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
 *                   example: Requests retrieved successfully
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
 *                           request_reference:
 *                             type: string
 *                             example: SR-1779449061291-1711
 *
 *                           client_id:
 *                             type: string
 *                             format: uuid
 *
 *                           client_name:
 *                             type: string
 *                             example: Equity BCDC
 *
 *                           service_id:
 *                             type: string
 *                             format: uuid
 *
 *                           service_name:
 *                             type: string
 *                             example: Billetterie
 *
 *                           partner_id:
 *                             type: string
 *                             format: uuid
 *
 *                           partner_name:
 *                             type: string
 *                             example: Congo Airways
 *
 *                           contract_id:
 *                             type: string
 *                             format: uuid
 *
 *                           request_type:
 *                             type: string
 *                             example: ticketing
 *
 *                           status:
 *                             type: string
 *                             example: pending
 *
 *                           total_amount:
 *                             type: string
 *                             example: "1900.00"
 *
 *                           amount_paid:
 *                             type: string
 *                             example: "500.00"
 *
 *                           remaining_amount:
 *                             type: number
 *                             example: 1400
 *
 *                           service_revenue:
 *                             type: string
 *                             example: "51.40"
 *
 *                           external_cost:
 *                             type: string
 *                             example: "1848.60"
 *
 *                           currency:
 *                             type: string
 *                             example: USD
 *
 *                           observation:
 *                             type: string
 *                             example: Mission Bruxelles juin 2026
 *
 *                           requested_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-22T11:24:21.331Z
 *
 *                           completed_at:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *
 *                           updated_at:
 *                             type: string
 *                             format: date-time
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
 * /api/service-requests/{id}:
 *   get:
 *     summary: Détail d'une demande de service
 *     description: Retourne toutes les informations d'un dossier.
 *     tags:
 *       - Service Requests
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       200:
 *         description: Dossier récupéré avec succès
 *
 *       404:
 *         description: Dossier introuvable
 */
router.get(
  '/:id',
  authMiddleware,
  controller.getById
);

/**
 * @openapi
 * /api/service-requests/{id}:
 *   put:
 *     summary: Modifier une demande de service
 *     description: Met à jour une demande de service existante.
 *     tags:
 *       - Service Requests
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de la demande
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
 *               status:
 *                 type: string
 *                 example: completed
 *
 *               observation:
 *                 type: string
 *                 example: Voyage confirmé et billet émis
 *
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *       200:
 *         description: Demande modifiée avec succès
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
 *         description: Demande introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  validate(
    updateServiceRequestSchema
  ),
  controller.update
);

/**
 * @openapi
 * /api/service-requests/{id}:
 *   delete:
 *     summary: Supprimer une demande de service
 *     description: Effectue une suppression logique d'une demande de service.
 *     tags:
 *       - Service Requests
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant de la demande
 *
 *     responses:
 *       200:
 *         description: Demande supprimée avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et managers
 *
 *       404:
 *         description: Demande introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  controller.delete
);

export default router;