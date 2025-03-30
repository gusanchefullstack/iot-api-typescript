import { Router } from 'express';
import * as sensorController from '../controllers/sensorController';

const router = Router();

// Obtener todos los sensores
router.get('/', sensorController.getAllSensors);

// Obtener todos los sensores de una placa
router.get('/board/:boardId', sensorController.getSensorsByBoard);

// Obtener un sensor por ID
router.get('/:id', sensorController.getSensorById);

// Crear un nuevo sensor
router.post('/', sensorController.createSensor);

// Actualizar un sensor
router.put('/:id', sensorController.updateSensor);

// Eliminar un sensor
router.delete('/:id', sensorController.deleteSensor);

export default router; 