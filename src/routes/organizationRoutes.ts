import { Router } from 'express';
import {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organizationController';
import { organizationSchema, organizationUpdateSchema } from '../schemas/organizationSchema';
import { validateSchema } from '../middleware/validateSchema';

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
 */
router.get('/', getAllOrganizations);

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Obtener una organización por ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Organización encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Organización no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', getOrganizationById);

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
 *             $ref: '#/components/schemas/OrganizationInput'
 *     responses:
 *       201:
 *         description: Organización creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateSchema(organizationSchema), createOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *     summary: Actualizar una organización
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationUpdateInput'
 *     responses:
 *       200:
 *         description: Organización actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Organización no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateSchema(organizationUpdateSchema), updateOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Eliminar una organización
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Organización eliminada
 *       404:
 *         description: Organización no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', deleteOrganization);

export default router; 