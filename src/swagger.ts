import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de IoT',
      version: '1.0.0',
      description: 'API para gestionar dispositivos IoT, sensores y datos de medición',
    },
    servers: [
      {
        url: 'http://localhost:8090',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: ID único de la organización
 *         name:
 *           type: string
 *           description: Nombre de la organización
 *         country:
 *           type: string
 *           description: País donde se encuentra la organización
 *         state:
 *           type: string
 *           description: Estado donde se encuentra la organización
 *         city:
 *           type: string
 *           description: Ciudad donde se encuentra la organización
 *         address:
 *           type: string
 *           description: Dirección de la organización
 *         zipcode:
 *           type: string
 *           description: Código postal de la organización
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       required:
 *         - name
 *         - country
 *         - state
 *         - city
 *         - address
 *         - zipcode
 *     Site:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: ID único del sitio
 *         name:
 *           type: string
 *           description: Nombre del sitio
 *         country:
 *           type: string
 *           description: País donde se encuentra el sitio
 *         state:
 *           type: string
 *           description: Estado donde se encuentra el sitio
 *         city:
 *           type: string
 *           description: Ciudad donde se encuentra el sitio
 *         address:
 *           type: string
 *           description: Dirección del sitio
 *         zipcode:
 *           type: string
 *           description: Código postal del sitio
 *         organizationId:
 *           type: string
 *           format: objectId
 *           description: ID de la organización a la que pertenece el sitio
 *         organization:
 *           $ref: '#/components/schemas/Organization'
 *         measuringPoints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MeasuringPoint'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       required:
 *         - name
 *         - organizationId
 *     SiteInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del sitio
 *           minLength: 3
 *           maxLength: 100
 *         country:
 *           type: string
 *           description: País donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         state:
 *           type: string
 *           description: Estado donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         city:
 *           type: string
 *           description: Ciudad donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         address:
 *           type: string
 *           description: Dirección del sitio
 *           minLength: 3
 *           maxLength: 100
 *         zipcode:
 *           type: string
 *           description: Código postal del sitio
 *           minLength: 5
 *           maxLength: 10
 *         organizationId:
 *           type: string
 *           format: objectId
 *           description: ID de la organización a la que pertenece el sitio
 *       required:
 *         - name
 *         - country
 *         - state
 *         - city
 *         - address
 *         - zipcode
 *         - organizationId
 *     SiteUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del sitio
 *           minLength: 3
 *           maxLength: 100
 *         country:
 *           type: string
 *           description: País donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         state:
 *           type: string
 *           description: Estado donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         city:
 *           type: string
 *           description: Ciudad donde se encuentra el sitio
 *           minLength: 3
 *           maxLength: 100
 *         address:
 *           type: string
 *           description: Dirección del sitio
 *           minLength: 3
 *           maxLength: 100
 *         zipcode:
 *           type: string
 *           description: Código postal del sitio
 *           minLength: 5
 *           maxLength: 10
 *     MeasuringPoint:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: ID único del punto de medición
 *         name:
 *           type: string
 *           description: Nombre del punto de medición
 *         description:
 *           type: string
 *           description: Descripción del punto de medición
 *         coordinates:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitud
 *             longitude:
 *               type: number
 *               description: Longitud
 *         siteId:
 *           type: string
 *           format: objectId
 *           description: ID del sitio al que pertenece el punto de medición
 *         site:
 *           $ref: '#/components/schemas/Site'
 *         sensors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sensor'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       required:
 *         - name
 *         - siteId
 *     Sensor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: ID único del sensor
 *         name:
 *           type: string
 *           description: Nombre del sensor
 *         description:
 *           type: string
 *           description: Descripción del sensor
 *         type:
 *           type: string
 *           description: Tipo de sensor
 *           enum: [TEMPERATURE, HUMIDITY, PRESSURE, FLOW, LEVEL, VIBRATION, OTHER]
 *         unit:
 *           type: string
 *           description: Unidad de medida
 *         min:
 *           type: number
 *           description: Valor mínimo
 *         max:
 *           type: number
 *           description: Valor máximo
 *         measuringPointId:
 *           type: string
 *           format: objectId
 *           description: ID del punto de medición al que pertenece el sensor
 *         measuringPoint:
 *           $ref: '#/components/schemas/MeasuringPoint'
 *         boardId:
 *           type: string
 *           format: objectId
 *           description: ID de la placa a la que pertenece el sensor
 *         board:
 *           $ref: '#/components/schemas/Board'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       required:
 *         - name
 *         - type
 *         - unit
 *         - measuringPointId
 *     Board:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: ID único de la placa
 *         name:
 *           type: string
 *           description: Nombre de la placa
 *         description:
 *           type: string
 *           description: Descripción de la placa
 *         serialNumber:
 *           type: string
 *           description: Número de serie de la placa
 *         model:
 *           type: string
 *           description: Modelo de la placa
 *         sensors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sensor'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       required:
 *         - name
 *         - serialNumber
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error de validación
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: Campo que falló la validación
 *               message:
 *                 type: string
 *                 description: Descripción del error
 *     NotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de recurso no encontrado
 *     MeasuringPointInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del punto de medición
 *           minLength: 3
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Descripción del punto de medición
 *           minLength: 3
 *           maxLength: 100
 *         coordinates:
 *           type: object
 *           description: Coordenadas geográficas
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitud
 *               minimum: -90
 *               maximum: 90
 *             longitude:
 *               type: number
 *               description: Longitud
 *               minimum: -180
 *               maximum: 180
 *         siteId:
 *           type: string
 *           format: objectId
 *           description: ID del sitio al que pertenece el punto de medición
 *       required:
 *         - name
 *         - description
 *         - coordinates
 *         - siteId
 *     MeasuringPointUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del punto de medición
 *           minLength: 3
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Descripción del punto de medición
 *           minLength: 3
 *           maxLength: 100
 *         coordinates:
 *           type: object
 *           description: Coordenadas geográficas
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitud
 *               minimum: -90
 *               maximum: 90
 *             longitude:
 *               type: number
 *               description: Longitud
 *               minimum: -180
 *               maximum: 180
 *         siteId:
 *           type: string
 *           format: objectId
 *           description: ID del sitio al que pertenece el punto de medición
 */ 