import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Server error
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
 *     summary: Get all boards for a measuring point
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: measuringPointId
 *         schema:
 *           type: string
 *         required: true
 *         description: Measuring point ID
 *     responses:
 *       200:
 *         description: List of boards for the measuring point
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
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
 *     summary: Get a board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
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
 *     summary: Create a new board
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
 *                 description: Board name
 *                 maxLength: 250
 *               serialNumber:
 *                 type: string
 *                 description: Board serial number
 *                 maxLength: 100
 *               firmwareVersion:
 *                 type: string
 *                 description: Board firmware version
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 description: Board description
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 description: Board status
 *                 enum: [active, inactive, maintenance]
 *               measuringPointId:
 *                 type: string
 *                 description: ID of the measuring point this board belongs to
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Measuring point not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
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
 *     summary: Update a board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Board ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Board name
 *                 maxLength: 250
 *               serialNumber:
 *                 type: string
 *                 description: Board serial number
 *                 maxLength: 100
 *               firmwareVersion:
 *                 type: string
 *                 description: Board firmware version
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 description: Board description
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 description: Board status
 *                 enum: [active, inactive, maintenance]
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
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
 *     summary: Delete a board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board successfully deleted
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', boardController.deleteBoard);

export default router; 