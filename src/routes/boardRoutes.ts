import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

// Obtener todas las placas
router.get('/', boardController.getAllBoards);

// Obtener todas las placas de un punto de medición
router.get('/measuring-point/:measuringPointId', boardController.getBoardsByMeasuringPoint);

// Obtener una placa por ID
router.get('/:id', boardController.getBoardById);

// Crear una nueva placa
router.post('/', boardController.createBoard);

// Actualizar una placa
router.put('/:id', boardController.updateBoard);

// Eliminar una placa
router.delete('/:id', boardController.deleteBoard);

export default router; 