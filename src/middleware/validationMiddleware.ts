import { Request, Response, NextFunction } from 'express';
import { validationResult, param } from 'express-validator';
import ObjectID from 'mongo-objectid';
import { z } from 'zod';

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

// Middleware para validar la entrada con Zod
export const validateRequest = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar el cuerpo de la solicitud con el esquema proporcionado
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Si hay errores de validación, devolver un formato de error consistente
        return res.status(400).json({
          error: error.errors.map(err => ({
            message: err.message,
            path: err.path
          }))
        });
      }
      // Para otros errores, pasar al siguiente middleware de error
      next(error);
    }
  };
};

// Validar que un ID de MongoDB sea válido
export const validateMongoId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  // Expresión regular para validar un ID de MongoDB
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
  
  if (!mongoIdRegex.test(id)) {
    return res.status(400).json({ 
      error: 'Invalid ID format' 
    });
  }
  
  next();
}; 