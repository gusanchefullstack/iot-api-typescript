import { Router } from 'express';
import * as measuringPointController from '../controllers/measuringPointController';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *       404:
 *         description: Punto de medición no encontrado
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
 *             type: object
 *             required:
 *               - name
 *               - siteId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del punto de medición
 *               description:
 *                 type: string
 *                 description: Descripción del punto de medición
 *               coordinates:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitud del punto de medición
 *                   longitude:
 *                     type: number
 *                     description: Longitud del punto de medición
 *               siteId:
 *                 type: string
 *                 description: ID del sitio al que pertenece el punto de medición
 *     responses:
 *       201:
 *         description: Punto de medición creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
router.post('/', measuringPointController.createMeasuringPoint);

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
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del punto de medición
 *               description:
 *                 type: string
 *                 description: Descripción del punto de medición
 *               coordinates:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitud del punto de medición
 *                   longitude:
 *                     type: number
 *                     description: Longitud del punto de medición
 *     responses:
 *       200:
 *         description: Punto de medición actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Punto de medición no encontrado
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
router.put('/:id', measuringPointController.updateMeasuringPoint);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Punto de medición eliminado correctamente
 *       404:
 *         description: Punto de medición no encontrado
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
router.delete('/:id', measuringPointController.deleteMeasuringPoint);

export default router; 