import { Router } from 'express';

import { ClientController } from '../controllers/client.controller';

import { authMiddleware } from '../middleware/auth.middleware';

import { validate } from '../middleware/validate.middleware';

import {
  createClientSchema,
  updateClientSchema
} from '../validations/client.validation';

const router = Router();

const clientController =
  new ClientController();

/**
 * @openapi
 * tags:
 *   - name: Clients
 *     description: Gestion des clients particuliers et entreprises
 */

/**
 * @openapi
 * /api/clients:
 *   post:
 *     summary: Créer un client
 *     description: Crée un nouveau client particulier ou entreprise.
 *     tags:
 *       - Clients
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *               - client_type
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Equity BCDC
 *
 *               client_type:
 *                 type: string
 *                 example: company
 *                 description: individual ou company
 *
 *               phone:
 *                 type: string
 *                 example: +243000000
 *
 *               email:
 *                 type: string
 *                 example: contact@equity.com
 *
 *               address:
 *                 type: string
 *                 example: Kinshasa
 *
 *               contact_person:
 *                 type: string
 *                 example: John Doe
 *
 *               tax_number:
 *                 type: string
 *                 example: RCCM123
 *
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  validate(createClientSchema),
  clientController.create
);

/**
 * @openapi
 * /api/clients:
 *   get:
 *     summary: Liste des clients
 *     description: Retourne la liste paginée des clients avec filtres de recherche.
 *     tags:
 *       - Clients
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
 *           example: equity
 *         description: Recherche par nom, email ou téléphone
 *
 *       - in: query
 *         name: client_type
 *         schema:
 *           type: string
 *           example: company
 *         description: Filtrer par type de client
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
 *                   example: Clients retrieved successfully
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
 *                           name:
 *                             type: string
 *                             example: Equity BCDC
 *
 *                           client_type:
 *                             type: string
 *                             example: company
 *
 *                           phone:
 *                             type: string
 *                             example: +243000000
 *
 *                           email:
 *                             type: string
 *                             example: contact@equity.com
 *
 *                           address:
 *                             type: string
 *                             example: Kinshasa
 *
 *                           contact_person:
 *                             type: string
 *                             example: John Doe
 *
 *                           tax_number:
 *                             type: string
 *                             example: RCCM123
 *
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-20T10:34:18.522Z
 *
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-20T10:34:18.522Z
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
  clientController.findAll
);

/**
 * @openapi
 * /api/clients/{id}:
 *   put:
 *     summary: Modifier un client
 *     description: Met à jour les informations d'un client existant.
 *     tags:
 *       - Clients
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du client
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Equity BCDC SA
 *
 *               phone:
 *                 type: string
 *                 example: +243999999999
 *
 *               email:
 *                 type: string
 *                 example: support@equity.com
 *
 *               address:
 *                 type: string
 *                 example: Kinshasa Gombe
 *
 *               contact_person:
 *                 type: string
 *                 example: Jane Doe
 *
 *               tax_number:
 *                 type: string
 *                 example: RCCM456
 *
 *     responses:
 *       200:
 *         description: Client modifié avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       404:
 *         description: Client introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  validate(updateClientSchema),
  clientController.update
);

/**
 * @openapi
 * /api/clients/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     description: Suppression logique d'un client.
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du client
 *     responses:
 *       200:
 *         description: Client supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Client introuvable
 */

router.delete(
  '/:id',
  authMiddleware,
  clientController.delete
);

export default router;