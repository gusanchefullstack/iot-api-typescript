import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API IoT con Express y TypeScript',
      version,
      description: 'API RESTful para gestión de dispositivos IoT desarrollada con Express.js, TypeScript y MongoDB Atlas mediante Prisma ORM.',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
      contact: {
        name: 'Gustavo Sanchez',
        url: 'https://github.com/gusanchefullstack',
        email: 'gusanche@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8090/api',
        description: 'Servidor de desarrollo',
      }
    ],
    components: {
      schemas: {
        Organization: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único de la organización',
              example: '60d21b4667d0d8992e610c85',
            },
            name: {
              type: 'string',
              description: 'Nombre de la organización',
              example: 'Industrias XYZ',
            },
            description: {
              type: 'string',
              description: 'Descripción de la organización',
              example: 'Empresa dedicada a la fabricación de maquinaria industrial',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Site: {
          type: 'object',
          required: ['name', 'organizationId'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único del sitio',
              example: '60d21b4667d0d8992e610c86',
            },
            name: {
              type: 'string',
              description: 'Nombre del sitio',
              example: 'Planta Madrid',
            },
            description: {
              type: 'string',
              description: 'Descripción del sitio',
              example: 'Planta principal de fabricación en Madrid',
            },
            location: {
              type: 'string',
              description: 'Ubicación del sitio',
              example: 'Madrid, España',
            },
            organizationId: {
              type: 'string',
              description: 'ID de la organización a la que pertenece el sitio',
              example: '60d21b4667d0d8992e610c85',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        MeasuringPoint: {
          type: 'object',
          required: ['name', 'siteId'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único del punto de medición',
              example: '60d21b4667d0d8992e610c87',
            },
            name: {
              type: 'string',
              description: 'Nombre del punto de medición',
              example: 'Zona producción A',
            },
            description: {
              type: 'string',
              description: 'Descripción del punto de medición',
              example: 'Punto de control de línea de producción A',
            },
            coordinates: {
              type: 'object',
              description: 'Coordenadas geográficas del punto de medición',
              properties: {
                latitude: {
                  type: 'number',
                  description: 'Latitud',
                  example: 40.416775,
                },
                longitude: {
                  type: 'number',
                  description: 'Longitud',
                  example: -3.703790,
                },
              },
            },
            siteId: {
              type: 'string',
              description: 'ID del sitio al que pertenece el punto de medición',
              example: '60d21b4667d0d8992e610c86',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Board: {
          type: 'object',
          required: ['name', 'measuringPointId'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único de la placa',
              example: '60d21b4667d0d8992e610c88',
            },
            name: {
              type: 'string',
              description: 'Nombre de la placa',
              example: 'Board-X123',
            },
            serialNumber: {
              type: 'string',
              description: 'Número de serie de la placa',
              example: 'SN-ABC12345XYZ',
            },
            firmwareVersion: {
              type: 'string',
              description: 'Versión del firmware',
              example: 'v1.2.3',
            },
            description: {
              type: 'string',
              description: 'Descripción de la placa',
              example: 'Placa principal de control de sensores zona A',
            },
            status: {
              type: 'string',
              description: 'Estado de la placa',
              enum: ['active', 'inactive', 'maintenance'],
              example: 'active',
            },
            measuringPointId: {
              type: 'string',
              description: 'ID del punto de medición al que pertenece la placa',
              example: '60d21b4667d0d8992e610c87',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Sensor: {
          type: 'object',
          required: ['name', 'type', 'boardId'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único del sensor',
              example: '60d21b4667d0d8992e610c89',
            },
            name: {
              type: 'string',
              description: 'Nombre del sensor',
              example: 'Sensor-TEMP-X1',
            },
            type: {
              type: 'string',
              description: 'Tipo de sensor',
              enum: ['TEMPERATURE', 'HUMIDITY', 'PH'],
              example: 'TEMPERATURE',
            },
            unit: {
              type: 'string',
              description: 'Unidad de medida',
              example: '°C',
            },
            minValue: {
              type: 'number',
              description: 'Valor mínimo del rango del sensor',
              example: -10,
            },
            maxValue: {
              type: 'number',
              description: 'Valor máximo del rango del sensor',
              example: 50,
            },
            description: {
              type: 'string',
              description: 'Descripción del sensor',
              example: 'Sensor de temperatura para zona crítica',
            },
            status: {
              type: 'string',
              description: 'Estado del sensor',
              enum: ['active', 'inactive', 'maintenance'],
              example: 'active',
            },
            boardId: {
              type: 'string',
              description: 'ID de la placa a la que pertenece el sensor',
              example: '60d21b4667d0d8992e610c88',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Recurso no encontrado',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 