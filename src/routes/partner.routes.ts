import { Router } from 'express';

import { PartnerController }
from '../controllers/partner.controller';

import { authMiddleware }
from '../middleware/auth.middleware';

import { roleMiddleware }
from '../middleware/role.middleware';

import { validate }
from '../middleware/validate.middleware';

import {
  createPartnerSchema,
  updatePartnerSchema
}
from '../validations/partner.validation';

const router = Router();

const partnerController =
  new PartnerController();

/**
 * @openapi
 * tags:
 *   - name: Partners
 *     description: Gestion des partenaires commerciaux et compagnies partenaires
 */

/**
 * @openapi
 * /api/partners:
 *   post:
 *     summary: Créer un partenaire
 *     description: Crée un nouveau partenaire commercial.
 *     tags:
 *       - Partners
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
 *               - type
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *                 example: Congo Airways
 *
 *               type:
 *                 type: string
 *                 example: company
 *                 description: company ou individual
 *
 *     responses:
 *       201:
 *         description: Partenaire créé avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et agents
 *
 *       500:
 *         description: Erreur serveur
 */

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'agent'),
  validate(createPartnerSchema),
  partnerController.create
);

/**
 * @openapi
 * /api/partners:
 *   get:
 *     summary: Liste des partenaires
 *     description: Retourne la liste de tous les partenaires actifs.
 *     tags:
 *       - Partners
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
 *                   example: Partners retrieved successfully
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
 *                       name:
 *                         type: string
 *                         example: Congo Airways
 *
 *                       type:
 *                         type: string
 *                         example: company
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:45:05.096Z
 *
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-20T13:45:05.096Z
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
  partnerController.findAll
);

/**
 * @openapi
 * /api/partners/{id}:
 *   put:
 *     summary: Modifier un partenaire
 *     description: Met à jour les informations d'un partenaire.
 *     tags:
 *       - Partners
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du partenaire
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
 *               name:
 *                 type: string
 *                 example: Congo Airways
 *
 *               type:
 *                 type: string
 *                 example: company
 *
 *               is_active:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Partenaire modifié avec succès
 *
 *       400:
 *         description: Données invalides
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs et agents
 *
 *       404:
 *         description: Partenaire introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'agent'),
  validate(updatePartnerSchema),
  partnerController.update
);

/**
 * @openapi
 * /api/partners/{id}:
 *   delete:
 *     summary: Supprimer un partenaire
 *     description: Effectue une suppression logique d'un partenaire.
 *     tags:
 *       - Partners
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du partenaire
 *
 *     responses:
 *       200:
 *         description: Partenaire supprimé avec succès
 *
 *       401:
 *         description: Non authentifié
 *
 *       403:
 *         description: Accès réservé aux administrateurs
 *
 *       404:
 *         description: Partenaire introuvable
 *
 *       500:
 *         description: Erreur serveur
 */

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  partnerController.delete
);

export default router;