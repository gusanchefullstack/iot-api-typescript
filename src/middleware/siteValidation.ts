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

// Validaciones para crear un sitio
export const createSiteValidation: RequestHandler[] = [
  body('name')
    .notEmpty().withMessage('El nombre del sitio es requerido')
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('location')
    .optional()
    .isLength({ max: 250 }).withMessage('La ubicación no puede exceder los 250 caracteres'),
  body('organizationId')
    .notEmpty().withMessage('El ID de la organización es requerido')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('El ID de la organización debe ser un MongoDB ObjectId válido');
      }
      return true;
    }),
  handleValidationErrors
];

// Validaciones para actualizar un sitio
export const updateSiteValidation: RequestHandler[] = [
  body('name')
    .optional()
    .isLength({ max: 250 }).withMessage('El nombre no puede exceder los 250 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 250 }).withMessage('La descripción no puede exceder los 250 caracteres'),
  body('location')
    .optional()
    .isLength({ max: 250 }).withMessage('La ubicación no puede exceder los 250 caracteres'),
  handleValidationErrors
]; 