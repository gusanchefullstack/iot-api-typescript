import { body, param } from 'express-validator';
import { handleValidationErrors, isValidObjectId } from './validationMiddleware';
import { RequestHandler } from 'express';
import { SensorType } from '@prisma/client';

// Validación para MongoDB ObjectId
export const validateMongoId = (paramName: string = 'id'): RequestHandler[] => [
  param(paramName)
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error(`El ${paramName} debe ser un MongoDB ObjectId válido`);
      }
      return true;
    }),
  handleValidationErrors
];

// Validaciones para crear un sensor
export const createSensorValidation: RequestHandler[] = [
  body('name')
    .notEmpty().withMessage('El nombre del sensor es requerido')
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('type')
    .notEmpty().withMessage('El tipo de sensor es requerido')
    .isIn(Object.values(SensorType)).withMessage('El tipo debe ser uno de los siguientes: ' + Object.values(SensorType).join(', ')),
  body('unit')
    .optional()
    .isLength({ max: 250 }).withMessage('La unidad no puede exceder los 250 caracteres'),
  body('minValue')
    .optional()
    .isFloat().withMessage('El valor mínimo debe ser un número'),
  body('maxValue')
    .optional()
    .isFloat().withMessage('El valor máximo debe ser un número')
    .custom((value, { req }) => {
      if (req.body.minValue !== undefined && value <= req.body.minValue) {
        throw new Error('El valor máximo debe ser mayor que el valor mínimo');
      }
      return true;
    }),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance']).withMessage('El estado debe ser uno de: active, inactive, maintenance'),
  body('boardId')
    .notEmpty().withMessage('El ID de la placa es requerido')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('El ID de la placa debe ser un MongoDB ObjectId válido');
      }
      return true;
    }),
  handleValidationErrors
];

// Validaciones para actualizar un sensor
export const updateSensorValidation: RequestHandler[] = [
  body('name')
    .optional()
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('type')
    .optional()
    .isIn(Object.values(SensorType)).withMessage('El tipo debe ser uno de los siguientes: ' + Object.values(SensorType).join(', ')),
  body('unit')
    .optional()
    .isLength({ max: 250 }).withMessage('La unidad no puede exceder los 250 caracteres'),
  body('minValue')
    .optional()
    .isFloat().withMessage('El valor mínimo debe ser un número'),
  body('maxValue')
    .optional()
    .isFloat().withMessage('El valor máximo debe ser un número')
    .custom((value, { req }) => {
      if (req.body.minValue !== undefined && value <= req.body.minValue) {
        throw new Error('El valor máximo debe ser mayor que el valor mínimo');
      }
      return true;
    }),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance']).withMessage('El estado debe ser uno de: active, inactive, maintenance'),
  handleValidationErrors
]; 