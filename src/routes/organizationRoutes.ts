import { Router } from 'express';
import * as organizationController from '../controllers/organizationController';

const router = Router();

// Obtener todas las organizaciones
router.get('/', organizationController.getAllOrganizations);

// Obtener una organización por ID
router.get('/:id', organizationController.getOrganizationById);

// Crear una nueva organización
router.post('/', organizationController.createOrganization);

// Actualizar una organización
router.put('/:id', organizationController.updateOrganization);

// Eliminar una organización
router.delete('/:id', organizationController.deleteOrganization);

export default router; 