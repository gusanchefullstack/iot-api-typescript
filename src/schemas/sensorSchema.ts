import { z } from 'zod';

// Enum para el tipo de sensor
export const SensorType = z.enum(['TEMPERATURE', 'HUMIDITY', 'PH']);
export type SensorType = z.infer<typeof SensorType>;

// Enum para el estado del sensor
export const SensorStatus = z.enum(['active', 'inactive', 'maintenance']);
export type SensorStatus = z.infer<typeof SensorStatus>;

export const sensorSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  type: SensorType
    .describe('Tipo de sensor: TEMPERATURE, HUMIDITY, PH'),
  unit: z.string()
    .min(1, 'La unidad de medida es requerida')
    .max(20, 'La unidad de medida no puede exceder los 20 caracteres'),
  minValue: z.number()
    .optional()
    .describe('Valor mínimo del sensor'),
  maxValue: z.number()
    .optional()
    .describe('Valor máximo del sensor'),
  description: z.string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'La descripción no puede exceder los 100 caracteres')
    .optional(),
  status: SensorStatus
    .describe('Estado del sensor: active, inactive, maintenance')
    .optional()
    .default('active'),
  boardId: z.string()
    .min(1, 'El ID de la placa es requerido'),
});

// Regla para asegurar que maxValue es mayor que minValue cuando ambos están presentes
export const sensorSchemaWithRefinements = sensorSchema.refine(
  (data) => {
    if (data.minValue !== undefined && data.maxValue !== undefined) {
      return data.maxValue > data.minValue;
    }
    return true;
  },
  {
    message: 'El valor máximo debe ser mayor que el valor mínimo',
    path: ['maxValue'],
  }
);

// Para el esquema de actualización, primero hacemos parcial el esquema base y luego aplicamos el refinamiento
export const sensorUpdateSchema = sensorSchema.partial().refine(
  (data) => {
    if (data.minValue !== undefined && data.maxValue !== undefined) {
      return data.maxValue > data.minValue;
    }
    return true;
  },
  {
    message: 'El valor máximo debe ser mayor que el valor mínimo',
    path: ['maxValue'],
  }
);

export type SensorInput = z.infer<typeof sensorSchemaWithRefinements>;
export type SensorUpdateInput = z.infer<typeof sensorUpdateSchema>; 