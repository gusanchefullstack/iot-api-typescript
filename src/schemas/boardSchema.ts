import { z } from 'zod';

// Enum para el estado del tablero
export const BoardStatus = z.enum(['active', 'inactive', 'maintenance']);
export type BoardStatus = z.infer<typeof BoardStatus>;

export const boardSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  serialNumber: z.string()
    .min(3, 'El número de serie debe tener al menos 3 caracteres')
    .max(50, 'El número de serie no puede exceder los 50 caracteres'),
  firmwareVersion: z.string()
    .min(1, 'La versión del firmware es requerida')
    .max(20, 'La versión del firmware no puede exceder los 20 caracteres')
    .optional(),
  description: z.string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'La descripción no puede exceder los 100 caracteres')
    .optional(),
  status: BoardStatus
    .describe('Estado de la placa: active, inactive, maintenance')
    .optional()
    .default('active'),
  measuringPointId: z.string()
    .min(1, 'El ID del punto de medición es requerido'),
});

export const boardUpdateSchema = boardSchema.partial();

export type BoardInput = z.infer<typeof boardSchema>;
export type BoardUpdateInput = z.infer<typeof boardUpdateSchema>; 