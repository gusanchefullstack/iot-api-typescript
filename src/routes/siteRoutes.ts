import { Router } from 'express';
import * as siteController from '../controllers/siteController';

const router = Router();

// Obtener todos los sitios
router.get('/', siteController.getAllSites);

// Obtener todos los sitios de una organización
router.get('/organization/:organizationId', siteController.getSitesByOrganization);

// Obtener un sitio por ID
router.get('/:id', siteController.getSiteById);

// Crear un nuevo sitio
router.post('/', siteController.createSite);

// Actualizar un sitio
router.put('/:id', siteController.updateSite);

// Eliminar un sitio
router.delete('/:id', siteController.deleteSite);

export default router; 