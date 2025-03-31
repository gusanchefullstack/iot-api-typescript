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
      if (!value) return true;
      
      // Validar que tenga las propiedades latitude y longitude
      if (typeof value.latitude === 'undefined' || typeof value.longitude === 'undefined') {
        throw new Error('Las coordenadas deben tener latitud y longitud');
      }
      
      // Validar que latitude y longitude sean números
      if (typeof value.latitude !== 'number' || typeof value.longitude !== 'number') {
        throw new Error('La latitud y longitud deben ser números');
      }
      
      // Validar rango de latitud (-90 a 90)
      if (value.latitude < -90 || value.latitude > 90) {
        throw new Error('La latitud debe estar entre -90 y 90 grados');
      }
      
      // Validar rango de longitud (-180 a 180)
      if (value.longitude < -180 || value.longitude > 180) {
        throw new Error('La longitud debe estar entre -180 y 180 grados');
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
      if (!value) return true;
      
      // Validar que tenga las propiedades latitude y longitude
      if (typeof value.latitude === 'undefined' || typeof value.longitude === 'undefined') {
        throw new Error('Las coordenadas deben tener latitud y longitud');
      }
      
      // Validar que latitude y longitude sean números
      if (typeof value.latitude !== 'number' || typeof value.longitude !== 'number') {
        throw new Error('La latitud y longitud deben ser números');
      }
      
      // Validar rango de latitud (-90 a 90)
      if (value.latitude < -90 || value.latitude > 90) {
        throw new Error('La latitud debe estar entre -90 y 90 grados');
      }
      
      // Validar rango de longitud (-180 a 180)
      if (value.longitude < -180 || value.longitude > 180) {
        throw new Error('La longitud debe estar entre -180 y 180 grados');
      }
      
      return true;
    }),
  handleValidationErrors
]; 