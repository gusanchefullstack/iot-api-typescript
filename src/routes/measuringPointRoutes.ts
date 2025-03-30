import { Router } from 'express';
import * as measuringPointController from '../controllers/measuringPointController';

const router = Router();

// Obtener todos los puntos de medición
router.get('/', measuringPointController.getAllMeasuringPoints);

// Obtener todos los puntos de medición de un sitio
router.get('/site/:siteId', measuringPointController.getMeasuringPointsBySite);

// Obtener un punto de medición por ID
router.get('/:id', measuringPointController.getMeasuringPointById);

// Crear un nuevo punto de medición
router.post('/', measuringPointController.createMeasuringPoint);

// Actualizar un punto de medición
router.put('/:id', measuringPointController.updateMeasuringPoint);

// Eliminar un punto de medición
router.delete('/:id', measuringPointController.deleteMeasuringPoint);

export default router; 