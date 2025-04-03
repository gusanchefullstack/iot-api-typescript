import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateSchema = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.errors
        });
      }
      return res.status(400).json({
        message: 'Error de validación',
        error: 'Error inesperado durante la validación'
      });
    }
  };
}; 