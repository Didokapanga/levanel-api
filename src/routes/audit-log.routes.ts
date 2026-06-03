import { Router }
from 'express';

import { authMiddleware }
from '../middleware/auth.middleware';

import { AuditLogController }
from '../controllers/audit-log.controller';

const router = Router();

const controller =
  new AuditLogController();

/**
 * @openapi
 * tags:
 *   - name: Audit Logs
 *     description: Consultation des journaux d'audit et des actions effectuées dans le système
 */

/**
 * @openapi
 * /api/audit-logs:
 *   get:
 *     summary: Consulter les journaux d'audit
 *     description: Retourne les journaux d'audit avec possibilités de filtrage et pagination.
 *     tags:
 *       - Audit Logs
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
 *           example: 20
 *         description: Nombre d'éléments par page
 *
 *       - in: query
 *         name: module
 *         schema:
 *           type: string
 *           example: clients
 *         description: Filtrer par module
 *
 *       - in: query
 *         name: action_type
 *         schema:
 *           type: string
 *           example: create
 *         description: Filtrer par type d'action
 *
 *       - in: query
 *         name: actor_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrer par utilisateur
 *
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *           example: 2026-05-01
 *         description: Date de début
 *
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *           example: 2026-05-31
 *         description: Date de fin
 *
 *     responses:
 *       200:
 *         description: Journaux récupérés avec succès
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
 *                   example: Audit logs retrieved successfully
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
 *                           module:
 *                             type: string
 *                             example: clients
 *
 *                           entity_id:
 *                             type: string
 *                             format: uuid
 *
 *                           action_type:
 *                             type: string
 *                             example: create
 *
 *                           actor_id:
 *                             type: string
 *                             format: uuid
 *
 *                           actor_name:
 *                             type: string
 *                             example: Dido Kapanga
 *
 *                           description:
 *                             type: string
 *                             example: Client created successfully
 *
 *                           old_data:
 *                             type: object
 *                             nullable: true
 *
 *                           new_data:
 *                             type: object
 *                             nullable: true
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-06-03T14:00:00Z
 *
 *                     total:
 *                       type: integer
 *                       example: 150
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
 *                       example: 15
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

export default router;