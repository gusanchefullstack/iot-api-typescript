import { Request, Response, NextFunction } from 'express';
import { validationResult, param } from 'express-validator';
import ObjectID from 'mongo-objectid';

// Middleware para manejar errores de validación
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Función para validar que un string es un MongoDB ObjectId válido
export const isValidObjectId = (value: string) => {
  try {
    return ObjectID.isValid(value);
  } catch (e) {
    return false;
  }
}; 