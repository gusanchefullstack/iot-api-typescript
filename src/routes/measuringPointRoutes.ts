import { Router } from 'express';
import * as measuringPointController from '../controllers/measuringPointController';
import { measuringPointSchema, measuringPointUpdateSchema } from '../schemas/measuringPointSchema';
import { validateSchema } from '../middleware/validateSchema';

const router = Router();

/**
 * @swagger
 * /measuring-points:
 *   get:
 *     summary: Obtener todos los puntos de medición
 *     tags: [Measuring Points]
 *     responses:
 *       200:
 *         description: Lista de puntos de medición
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasuringPoint'
 *       500:
 *         description: Error del servidor
 */
router.get('/', measuringPointController.getAllMeasuringPoints);

/**
 * @swagger
 * /measuring-points/site/{siteId}:
 *   get:
 *     summary: Obtener todos los puntos de medición de un sitio
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: siteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sitio
 *     responses:
 *       200:
 *         description: Lista de puntos de medición del sitio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
 */
router.get('/site/:siteId', measuringPointController.getMeasuringPointsBySite);

/**
 * @swagger
 * /measuring-points/{id}:
 *   get:
 *     summary: Obtener un punto de medición por ID
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del punto de medición
 *     responses:
 *       200:
 *         description: Detalles del punto de medición
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Punto de medición no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', measuringPointController.getMeasuringPointById);

/**
 * @swagger
 * /measuring-points:
 *   post:
 *     summary: Crear un nuevo punto de medición
 *     tags: [Measuring Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeasuringPointInput'
 *     responses:
 *       201:
 *         description: Punto de medición creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Sitio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateSchema(measuringPointSchema), measuringPointController.createMeasuringPoint);

/**
 * @swagger
 * /measuring-points/{id}:
 *   put:
 *     summary: Actualizar un punto de medición
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del punto de medición
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeasuringPointUpdateInput'
 *     responses:
 *       200:
 *         description: Punto de medición actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Punto de medición no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateSchema(measuringPointUpdateSchema), measuringPointController.updateMeasuringPoint);

/**
 * @swagger
 * /measuring-points/{id}:
 *   delete:
 *     summary: Eliminar un punto de medición
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del punto de medición
 *     responses:
 *       200:
 *         description: Punto de medición eliminado exitosamente
 *       404:
 *         description: Punto de medición no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', measuringPointController.deleteMeasuringPoint);

export default router; 