import { Router } from 'express';

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
  res.json({ message: 'API de IoT - Ruta principal' });
});

export default router; 