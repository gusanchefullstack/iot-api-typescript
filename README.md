# API IoT con Express y TypeScript

API RESTful para gestión de dispositivos IoT desarrollada con Express.js y TypeScript.

## Requisitos

- Node.js v14+
- npm o yarn

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

## Estructura del Proyecto

```
.
├── src/
│   ├── controllers/   # Controladores de la API
│   ├── models/        # Modelos de datos
│   ├── routes/        # Rutas de la API
│   ├── middlewares/   # Middlewares
│   ├── utils/         # Utilidades
│   └── index.ts       # Punto de entrada
├── .env               # Variables de entorno
├── .gitignore         # Archivos ignorados por Git
├── package.json       # Dependencias y scripts
└── tsconfig.json      # Configuración de TypeScript
```

## Licencia

ISC 