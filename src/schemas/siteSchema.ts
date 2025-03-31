import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  country: z.string()
    .min(3, 'El país debe tener al menos 3 caracteres')
    .max(100, 'El país no puede exceder los 100 caracteres'),
  state: z.string()
    .min(3, 'El estado debe tener al menos 3 caracteres')
    .max(100, 'El estado no puede exceder los 100 caracteres'),
  city: z.string()
    .min(3, 'La ciudad debe tener al menos 3 caracteres')
    .max(100, 'La ciudad no puede exceder los 100 caracteres'),
  address: z.string()
    .min(3, 'La dirección debe tener al menos 3 caracteres')
    .max(100, 'La dirección no puede exceder los 100 caracteres'),
  zipcode: z.string()
    .min(5, 'El código postal debe tener al menos 5 caracteres')
    .max(10, 'El código postal no puede exceder los 10 caracteres'),
  organizationId: z.string()
    .min(1, 'El ID de la organización es requerido')
});

export const siteUpdateSchema = siteSchema.partial();

export type SiteInput = z.infer<typeof siteSchema>;
export type SiteUpdateInput = z.infer<typeof siteUpdateSchema>; 