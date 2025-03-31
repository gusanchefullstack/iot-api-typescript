import { Router } from 'express';
import * as sensorController from '../controllers/sensorController';

const router = Router();

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Get all sensors
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: List of sensors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', sensorController.getAllSensors);

/**
 * @swagger
 * /sensors/board/{boardId}:
 *   get:
 *     summary: Get all sensors for a board
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         schema:
 *           type: string
 *         required: true
 *         description: Board ID
 *     responses:
 *       200:
 *         description: List of sensors for the board
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
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
router.get('/board/:boardId', sensorController.getSensorsByBoard);

/**
 * @swagger
 * /sensors/types:
 *   get:
 *     summary: Get all sensor types
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: List of sensor types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/types', sensorController.getSensorTypes);

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Get a sensor by ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sensor ID
 *     responses:
 *       200:
 *         description: Sensor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor not found
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
router.get('/:id', sensorController.getSensorById);

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Create a new sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - boardId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sensor name
 *                 maxLength: 250
 *               type:
 *                 type: string
 *                 description: Sensor type
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *               unit:
 *                 type: string
 *                 description: Measurement unit
 *                 maxLength: 20
 *               description:
 *                 type: string
 *                 description: Sensor description
 *                 maxLength: 500
 *               minValue:
 *                 type: number
 *                 description: Minimum sensor value
 *               maxValue:
 *                 type: number
 *                 description: Maximum sensor value
 *               boardId:
 *                 type: string
 *                 description: ID of the board this sensor belongs to
 *     responses:
 *       201:
 *         description: Sensor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
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
router.post('/', sensorController.createSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   put:
 *     summary: Update a sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sensor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sensor name
 *                 maxLength: 250
 *               type:
 *                 type: string
 *                 description: Sensor type
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *               unit:
 *                 type: string
 *                 description: Measurement unit
 *                 maxLength: 20
 *               description:
 *                 type: string
 *                 description: Sensor description
 *                 maxLength: 500
 *               minValue:
 *                 type: number
 *                 description: Minimum sensor value
 *               maxValue:
 *                 type: number
 *                 description: Maximum sensor value
 *     responses:
 *       200:
 *         description: Sensor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor not found
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
router.put('/:id', sensorController.updateSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Delete a sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sensor ID
 *     responses:
 *       200:
 *         description: Sensor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor successfully deleted
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor not found
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
router.delete('/:id', sensorController.deleteSensor);

export default router; 