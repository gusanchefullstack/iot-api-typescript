import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerSpec from './config/swagger';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css'
}));

// Endpoint para obtener la especificación Swagger en formato JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
}); 