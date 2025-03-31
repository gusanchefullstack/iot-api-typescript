import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Obtener todas las placas
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Lista de placas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', boardController.getAllBoards);

/**
 * @swagger
 * /boards/measuring-point/{measuringPointId}:
 *   get:
 *     summary: Obtener todas las placas de un punto de medición
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: measuringPointId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del punto de medición
 *     responses:
 *       200:
 *         description: Lista de placas del punto de medición
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/measuring-point/:measuringPointId', boardController.getBoardsByMeasuringPoint);

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Obtener una placa por ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la placa
 *     responses:
 *       200:
 *         description: Detalles de la placa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Placa no encontrada
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
router.get('/:id', boardController.getBoardById);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Crear una nueva placa
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - measuringPointId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la placa
 *               serialNumber:
 *                 type: string
 *                 description: Número de serie de la placa
 *               firmwareVersion:
 *                 type: string
 *                 description: Versión del firmware
 *               description:
 *                 type: string
 *                 description: Descripción de la placa
 *               status:
 *                 type: string
 *                 enum: [active, inactive, maintenance]
 *                 description: Estado de la placa
 *               measuringPointId:
 *                 type: string
 *                 description: ID del punto de medición al que pertenece la placa
 *     responses:
 *       201:
 *         description: Placa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
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
router.post('/', boardController.createBoard);

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Actualizar una placa
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la placa
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
 *                 description: Nombre de la placa
 *               serialNumber:
 *                 type: string
 *                 description: Número de serie de la placa
 *               firmwareVersion:
 *                 type: string
 *                 description: Versión del firmware
 *               description:
 *                 type: string
 *                 description: Descripción de la placa
 *               status:
 *                 type: string
 *                 enum: [active, inactive, maintenance]
 *                 description: Estado de la placa
 *     responses:
 *       200:
 *         description: Placa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Placa no encontrada
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
router.put('/:id', boardController.updateBoard);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Eliminar una placa
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la placa
 *     responses:
 *       200:
 *         description: Placa eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Placa eliminada correctamente
 *       404:
 *         description: Placa no encontrada
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
router.delete('/:id', boardController.deleteBoard);

export default router; 