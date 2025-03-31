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

// Validaciones para crear una placa
export const createBoardValidation: RequestHandler[] = [
  body('name')
    .notEmpty().withMessage('El nombre de la placa es requerido')
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('serialNumber')
    .optional()
    .isLength({ max: 250 }).withMessage('El número de serie no puede exceder los 250 caracteres'),
  body('firmwareVersion')
    .optional()
    .isLength({ max: 250 }).withMessage('La versión del firmware no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance']).withMessage('El estado debe ser uno de: active, inactive, maintenance'),
  body('measuringPointId')
    .notEmpty().withMessage('El ID del punto de medición es requerido')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('El ID del punto de medición debe ser un MongoDB ObjectId válido');
      }
      return true;
    }),
  handleValidationErrors
];

// Validaciones para actualizar una placa
export const updateBoardValidation: RequestHandler[] = [
  body('name')
    .optional()
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('serialNumber')
    .optional()
    .isLength({ max: 250 }).withMessage('El número de serie no puede exceder los 250 caracteres'),
  body('firmwareVersion')
    .optional()
    .isLength({ max: 250 }).withMessage('La versión del firmware no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance']).withMessage('El estado debe ser uno de: active, inactive, maintenance'),
  handleValidationErrors
]; 