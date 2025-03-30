import { Router } from 'express';
import organizationRoutes from './organizationRoutes';
import siteRoutes from './siteRoutes';
import measuringPointRoutes from './measuringPointRoutes';
import boardRoutes from './boardRoutes';
import sensorRoutes from './sensorRoutes';

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
  res.json({ message: 'API de IoT - Bienvenido' });
});

// Rutas de la API
router.use('/organizations', organizationRoutes);
router.use('/sites', siteRoutes);
router.use('/measuring-points', measuringPointRoutes);
router.use('/boards', boardRoutes);
router.use('/sensors', sensorRoutes);

export default router; 