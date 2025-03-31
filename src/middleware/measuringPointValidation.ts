import { body, param } from 'express-validator';
import { handleValidationErrors, isValidObjectId } from './validationMiddleware';
import { RequestHandler } from 'express';

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

// Validaciones para crear un punto de medición
export const createMeasuringPointValidation: RequestHandler[] = [
  body('name')
    .notEmpty().withMessage('El nombre del punto de medición es requerido')
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('coordinates')
    .optional()
    .isObject().withMessage('Las coordenadas deben ser un objeto válido')
    .custom((value) => {
      if (value) {
        if (typeof value.latitude !== 'undefined' && typeof value.latitude !== 'number') {
          throw new Error('La latitud debe ser un número');
        }
        if (typeof value.longitude !== 'undefined' && typeof value.longitude !== 'number') {
          throw new Error('La longitud debe ser un número');
        }
      }
      return true;
    }),
  body('siteId')
    .notEmpty().withMessage('El ID del sitio es requerido')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('El ID del sitio debe ser un MongoDB ObjectId válido');
      }
      return true;
    }),
  handleValidationErrors
];

// Validaciones para actualizar un punto de medición
export const updateMeasuringPointValidation: RequestHandler[] = [
  body('name')
    .optional()
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('coordinates')
    .optional()
    .isObject().withMessage('Las coordenadas deben ser un objeto válido')
    .custom((value) => {
      if (value) {
        if (typeof value.latitude !== 'undefined' && typeof value.latitude !== 'number') {
          throw new Error('La latitud debe ser un número');
        }
        if (typeof value.longitude !== 'undefined' && typeof value.longitude !== 'number') {
          throw new Error('La longitud debe ser un número');
        }
      }
      return true;
    }),
  handleValidationErrors
]; 