import { z } from 'zod';

export const coordinatesSchema = z.object({
  latitude: z.number()
    .min(-90, 'La latitud debe estar entre -90 y 90')
    .max(90, 'La latitud debe estar entre -90 y 90'),
  longitude: z.number()
    .min(-180, 'La longitud debe estar entre -180 y 180')
    .max(180, 'La longitud debe estar entre -180 y 180'),
});

export const measuringPointSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  description: z.string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'La descripción no puede exceder los 100 caracteres'),
  coordinates: coordinatesSchema,
  siteId: z.string().min(1, 'El ID del sitio es requerido'),
});

export const measuringPointUpdateSchema = measuringPointSchema.partial();

export type MeasuringPointInput = z.infer<typeof measuringPointSchema>;
export type MeasuringPointUpdateInput = z.infer<typeof measuringPointUpdateSchema>; 