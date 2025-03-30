import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rutas
app.use('/api', routes);

// Ruta para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de IoT funcionando correctamente' });
});

// Manejador de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 