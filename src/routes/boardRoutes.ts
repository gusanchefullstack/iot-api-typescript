import { Router } from 'express';
import * as boardController from '../controllers/boardController';
import { boardSchema, boardUpdateSchema } from '../schemas/boardSchema';
import { validateSchema } from '../middleware/validateSchema';

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
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
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
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Placa no encontrada
 *       500:
 *         description: Error del servidor
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
 *             $ref: '#/components/schemas/BoardInput'
 *     responses:
 *       201:
 *         description: Placa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Punto de medición no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateSchema(boardSchema), boardController.createBoard);

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
 *             $ref: '#/components/schemas/BoardUpdateInput'
 *     responses:
 *       200:
 *         description: Placa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Placa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateSchema(boardUpdateSchema), boardController.updateBoard);

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
 *       404:
 *         description: Placa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', boardController.deleteBoard);

export default router; 