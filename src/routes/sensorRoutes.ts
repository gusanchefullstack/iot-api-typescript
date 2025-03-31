import { Router } from 'express';
import * as sensorController from '../controllers/sensorController';
import {
  createSensorValidation,
  updateSensorValidation
} from '../middleware/sensorValidation';

const router = Router();

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', sensorController.getAllSensors);

/**
 * @swagger
 * /sensors/types:
 *   get:
 *     summary: Obtener los tipos de sensores disponibles
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de tipos de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/types', sensorController.getSensorTypes);

/**
 * @swagger
 * /sensors/board/{boardId}:
 *   get:
 *     summary: Obtener todos los sensores de una placa
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la placa
 *     responses:
 *       200:
 *         description: Lista de sensores de la placa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
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
router.get('/board/:boardId', sensorController.getSensorsByBoard);

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Obtener un sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor
 *     responses:
 *       200:
 *         description: Detalles del sensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor no encontrado
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
router.get('/:id', sensorController.getSensorById);

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Crear un nuevo sensor
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
 *                 description: Nombre del sensor
 *                 maxLength: 250
 *               type:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *                 description: Tipo de sensor
 *               unit:
 *                 type: string
 *                 description: Unidad de medida
 *                 maxLength: 250
 *               minValue:
 *                 type: number
 *                 description: Valor mínimo del rango del sensor
 *               maxValue:
 *                 type: number
 *                 description: Valor máximo del rango del sensor
 *               description:
 *                 type: string
 *                 description: Descripción del sensor
 *                 maxLength: 250
 *               status:
 *                 type: string
 *                 enum: [active, inactive, maintenance]
 *                 description: Estado del sensor
 *               boardId:
 *                 type: string
 *                 description: ID de la placa a la que pertenece el sensor
 *     responses:
 *       201:
 *         description: Sensor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
router.post('/', createSensorValidation, sensorController.createSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   put:
 *     summary: Actualizar un sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del sensor
 *                 maxLength: 250
 *               type:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, PH]
 *                 description: Tipo de sensor
 *               unit:
 *                 type: string
 *                 description: Unidad de medida
 *                 maxLength: 250
 *               minValue:
 *                 type: number
 *                 description: Valor mínimo del rango del sensor
 *               maxValue:
 *                 type: number
 *                 description: Valor máximo del rango del sensor
 *               description:
 *                 type: string
 *                 description: Descripción del sensor
 *                 maxLength: 250
 *               status:
 *                 type: string
 *                 enum: [active, inactive, maintenance]
 *                 description: Estado del sensor
 *     responses:
 *       200:
 *         description: Sensor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor no encontrado
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
router.put('/:id', updateSensorValidation, sensorController.updateSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Eliminar un sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor
 *     responses:
 *       200:
 *         description: Sensor eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor eliminado correctamente
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Sensor no encontrado
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
router.delete('/:id', sensorController.deleteSensor);

export default router; 