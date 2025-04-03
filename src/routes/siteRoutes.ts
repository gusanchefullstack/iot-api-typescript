import { Router } from 'express';
import * as siteController from '../controllers/siteController';
import { siteSchema, siteUpdateSchema } from '../schemas/siteSchema';
import { validateSchema } from '../middleware/validateSchema';

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
 *       500:
 *         description: Error del servidor
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
 *       404:
 *         description: Sitio no encontrado
 *       500:
 *         description: Error del servidor
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
 *             $ref: '#/components/schemas/SiteInput'
 *     responses:
 *       201:
 *         description: Sitio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Organización no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateSchema(siteSchema), siteController.createSite);

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
 *             $ref: '#/components/schemas/SiteUpdateInput'
 *     responses:
 *       200:
 *         description: Sitio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Sitio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateSchema(siteUpdateSchema), siteController.updateSite);

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
 *       404:
 *         description: Sitio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', siteController.deleteSite);

export default router; 