import { Router } from 'express';
import * as siteController from '../controllers/siteController';
import {
  createSiteValidation,
  updateSiteValidation
} from '../middleware/siteValidation';

const router = Router();

/**
 * @swagger
 * /sites:
 *   get:
 *     summary: Obtener todos los sitios
 *     tags: [Sites]
 *     responses:
 *       200:
 *         description: Lista de sitios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', siteController.getAllSites);

/**
 * @swagger
 * /sites/organization/{organizationId}:
 *   get:
 *     summary: Obtener todos los sitios de una organización
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Lista de sitios de la organización
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/organization/:organizationId', siteController.getSitesByOrganization);

/**
 * @swagger
 * /sites/{id}:
 *   get:
 *     summary: Obtener un sitio por ID
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sitio
 *     responses:
 *       200:
 *         description: Detalles del sitio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sitio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', siteController.getSiteById);

/**
 * @swagger
 * /sites:
 *   post:
 *     summary: Crear un nuevo sitio
 *     tags: [Sites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organizationId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del sitio
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Descripción del sitio
 *                 maxLength: 250
 *               location:
 *                 type: string
 *                 description: Ubicación del sitio
 *                 maxLength: 250
 *               organizationId:
 *                 type: string
 *                 description: ID de la organización a la que pertenece el sitio
 *     responses:
 *       201:
 *         description: Sitio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Organización no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createSiteValidation, siteController.createSite);

/**
 * @swagger
 * /sites/{id}:
 *   put:
 *     summary: Actualizar un sitio
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sitio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del sitio
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Descripción del sitio
 *                 maxLength: 250
 *               location:
 *                 type: string
 *                 description: Ubicación del sitio
 *                 maxLength: 250
 *     responses:
 *       200:
 *         description: Sitio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sitio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', updateSiteValidation, siteController.updateSite);

/**
 * @swagger
 * /sites/{id}:
 *   delete:
 *     summary: Eliminar un sitio
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sitio
 *     responses:
 *       200:
 *         description: Sitio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sitio eliminado correctamente
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sitio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', siteController.deleteSite);

export default router; 