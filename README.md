# API IoT con Express y TypeScript

API RESTful para gestión de dispositivos IoT desarrollada con Express.js, TypeScript y MongoDB Atlas mediante Prisma ORM.

## Requisitos

- Node.js v14+
- npm o yarn
- MongoDB Atlas cuenta (para la base de datos)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/gusanchefullstack/iot-api-typescript.git
cd iot-api-typescript

# Instalar dependencias
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
NODE_ENV=development
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/iot-database?retryWrites=true&w=majority"
```

Reemplaza la URL de la base de datos con tu propia URL de conexión a MongoDB Atlas.

## Base de datos

Este proyecto utiliza Prisma ORM para conectarse a MongoDB Atlas. Los modelos de datos están definidos en el archivo `prisma/schema.prisma`.

### Estructura de datos

La API sigue una jerarquía de entidades:

1. **Organizations** (Organizaciones)
2. **Sites** (Sitios)
3. **Measuring Points** (Puntos de Medición)
4. **Boards** (Placas/Dispositivos)
5. **Sensors** (Sensores)

Cada nivel puede tener cero o más entidades del nivel siguiente.

#### Tipos de sensores disponibles

Los sensores pueden ser de los siguientes tipos:
- `TEMPERATURE` - Sensor de temperatura
- `HUMIDITY` - Sensor de humedad
- `PH` - Sensor de pH

### Comandos de Prisma

```bash
# Generar el cliente Prisma
npx prisma generate

# Aplicar cambios al esquema (si es necesario)
npx prisma db push
```

## Ejecución

```bash
# Modo desarrollo
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start
```

## Rutas de la API

### Organizaciones
- `GET /api/organizations` - Listar todas las organizaciones
- `GET /api/organizations/:id` - Obtener una organización por ID
- `POST /api/organizations` - Crear una nueva organización
- `PUT /api/organizations/:id` - Actualizar una organización
- `DELETE /api/organizations/:id` - Eliminar una organización

### Sitios
- `GET /api/sites` - Listar todos los sitios
- `GET /api/sites/organization/:organizationId` - Listar sitios de una organización
- `GET /api/sites/:id` - Obtener un sitio por ID
- `POST /api/sites` - Crear un nuevo sitio
- `PUT /api/sites/:id` - Actualizar un sitio
- `DELETE /api/sites/:id` - Eliminar un sitio

### Puntos de Medición
- `GET /api/measuring-points` - Listar todos los puntos de medición
- `GET /api/measuring-points/site/:siteId` - Listar puntos de medición de un sitio
- `GET /api/measuring-points/:id` - Obtener un punto de medición por ID
- `POST /api/measuring-points` - Crear un nuevo punto de medición
- `PUT /api/measuring-points/:id` - Actualizar un punto de medición
- `DELETE /api/measuring-points/:id` - Eliminar un punto de medición

### Placas
- `GET /api/boards` - Listar todas las placas
- `GET /api/boards/measuring-point/:measuringPointId` - Listar placas de un punto de medición
- `GET /api/boards/:id` - Obtener una placa por ID
- `POST /api/boards` - Crear una nueva placa
- `PUT /api/boards/:id` - Actualizar una placa
- `DELETE /api/boards/:id` - Eliminar una placa

### Sensores
- `GET /api/sensors` - Listar todos los sensores
- `GET /api/sensors/types` - Obtener los tipos de sensores disponibles
- `GET /api/sensors/board/:boardId` - Listar sensores de una placa
- `GET /api/sensors/:id` - Obtener un sensor por ID
- `POST /api/sensors` - Crear un nuevo sensor
- `PUT /api/sensors/:id` - Actualizar un sensor
- `DELETE /api/sensors/:id` - Eliminar un sensor

## Estructura del Proyecto

```
.
├── prisma/
│   └── schema.prisma       # Esquema de la base de datos
├── src/
│   ├── config/             # Configuraciones
│   ├── controllers/        # Controladores de la API
│   ├── models/             # Modelos adicionales
│   ├── routes/             # Rutas de la API
│   ├── middlewares/        # Middlewares
│   ├── utils/              # Utilidades
│   └── index.ts            # Punto de entrada
├── .env                    # Variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Dependencias y scripts
└── tsconfig.json           # Configuración de TypeScript
```

## Licencia

ISC 