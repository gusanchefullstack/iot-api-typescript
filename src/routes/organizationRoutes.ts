import { Router } from 'express';
import * as organizationController from '../controllers/organizationController';
import {
  createOrganizationValidation,
  updateOrganizationValidation
} from '../middleware/organizationValidation';

const router = Router();

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Obtener todas las organizaciones
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: Lista de organizaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', organizationController.getAllOrganizations);

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Obtener una organización por ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Detalles de la organización
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: ID inválido
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
router.get('/:id', organizationController.getOrganizationById);

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Crear una nueva organización
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la organización
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Descripción de la organización
 *                 maxLength: 250
 *     responses:
 *       201:
 *         description: Organización creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Datos inválidos
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
router.post('/', createOrganizationValidation, organizationController.createOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *     summary: Actualizar una organización
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la organización
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Descripción de la organización
 *                 maxLength: 250
 *     responses:
 *       200:
 *         description: Organización actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
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
router.put('/:id', updateOrganizationValidation, organizationController.updateOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Eliminar una organización
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Organización eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Organización eliminada correctamente
 *       400:
 *         description: ID inválido
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
router.delete('/:id', organizationController.deleteOrganization);

export default router; 