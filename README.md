# IoT API with Express and TypeScript

RESTful API for IoT device management developed with Express.js, TypeScript, and MongoDB Atlas using Prisma ORM.

## Requirements

- Node.js v14+
- npm or yarn
- MongoDB Atlas account (for the database)

## Installation

```bash
# Clone the repository
git clone https://github.com/gusanchefullstack/iot-api-typescript.git
cd iot-api-typescript

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the project root with the following variables:

```
PORT=8090
NODE_ENV=development
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/iot-database?retryWrites=true&w=majority"
```

Replace the database URL with your own MongoDB Atlas connection URL.

## Database

This project uses Prisma ORM to connect to MongoDB Atlas. Data models are defined in the `prisma/schema.prisma` file.

### Data Structure

The API follows a hierarchy of entities:

1. **Organizations**
2. **Sites**
3. **Measuring Points**
4. **Boards**
5. **Sensors**

Each level can have zero or more entities of the next level.

#### Available Sensor Types

Sensors can be of the following types:
- `TEMPERATURE` - Temperature sensor
- `HUMIDITY` - Humidity sensor
- `PH` - pH sensor

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Apply schema changes (if necessary)
npx prisma db push
```

## Execution

```bash
# Development mode
npm run dev

# Compile TypeScript
npm run build

# Run in production
npm start
```

## API Routes

### Organizations
- `GET /api/organizations` - List all organizations
- `GET /api/organizations/:id` - Get an organization by ID
- `POST /api/organizations` - Create a new organization
- `PUT /api/organizations/:id` - Update an organization
- `DELETE /api/organizations/:id` - Delete an organization

### Sites
- `GET /api/sites` - List all sites
- `GET /api/sites/organization/:organizationId` - List sites of an organization
- `GET /api/sites/:id` - Get a site by ID
- `POST /api/sites` - Create a new site
- `PUT /api/sites/:id` - Update a site
- `DELETE /api/sites/:id` - Delete a site

### Measuring Points
- `GET /api/measuring-points` - List all measuring points
- `GET /api/measuring-points/site/:siteId` - List measuring points of a site
- `GET /api/measuring-points/:id` - Get a measuring point by ID
- `POST /api/measuring-points` - Create a new measuring point
- `PUT /api/measuring-points/:id` - Update a measuring point
- `DELETE /api/measuring-points/:id` - Delete a measuring point

### Boards
- `GET /api/boards` - List all boards
- `GET /api/boards/measuring-point/:measuringPointId` - List boards of a measuring point
- `GET /api/boards/:id` - Get a board by ID
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Sensors
- `GET /api/sensors` - List all sensors
- `GET /api/sensors/types` - Get available sensor types
- `GET /api/sensors/board/:boardId` - List sensors of a board
- `GET /api/sensors/:id` - Get a sensor by ID
- `POST /api/sensors` - Create a new sensor
- `PUT /api/sensors/:id` - Update a sensor
- `DELETE /api/sensors/:id` - Delete a sensor

## Project Structure

```
.
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/             # Configurations
│   ├── controllers/        # API controllers
│   ├── models/             # Additional models
│   ├── routes/             # API routes
│   ├── middlewares/        # Middlewares
│   ├── utils/              # Utilities
│   └── index.ts            # Entry point
├── .env                    # Environment variables
├── .gitignore              # Files ignored by Git
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Validations

The API implements robust validations using express-validator to ensure data integrity:

### Common validations for all entities
- MongoDB ObjectId validation for all ID parameters
- Length limitation (maximum 250 characters) for fields such as name, description, etc.

### Entity-specific validations

#### Organizations
- `name` field required
- `description` field optional with maximum length of 250 characters

#### Sites
- `name` field required
- `description` and `location` fields optional with maximum length of 250 characters
- `organizationId` field required and must be a valid MongoDB ObjectId

#### Measuring Points
- `name` field required
- `description` field optional with maximum length of 250 characters
- `coordinates` field optional, must be an object with:
  - `latitude` and `longitude` properties required and numeric
  - Latitude must be between -90 and 90 degrees
  - Longitude must be between -180 and 180 degrees
- `siteId` field required and must be a valid MongoDB ObjectId

#### Boards
- `name` field required
- `serialNumber`, `firmwareVersion`, and `description` fields optional with maximum length of 250 characters
- `status` field optional, limited to values: 'active', 'inactive', 'maintenance'
- `measuringPointId` field required and must be a valid MongoDB ObjectId

#### Sensors
- `name` field required
- `type` field required, limited to the values defined in SensorType (TEMPERATURE, HUMIDITY, PH)
- `unit` field optional with maximum length of 250 characters
- `minValue` and `maxValue` fields optional, must be numbers (maxValue must be greater than minValue)
- `description` field optional with maximum length of 250 characters
- `status` field optional, limited to values: 'active', 'inactive', 'maintenance'
- `boardId` field required and must be a valid MongoDB ObjectId

### Error responses

Failed validations return responses with status code 400 (Bad Request) and a JSON object with error details:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-value",
      "msg": "Descriptive error message",
      "path": "field-name",
      "location": "body"
    }
  ]
}
```

## License

ISC 

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the interactive documentation at:

```
http://localhost:8090/api-docs
```

The documentation provides:
- Detailed description of all endpoints
- Data schemas for all entities
- Ability to test endpoints directly from the browser
- Examples of requests and responses

You can also get the OpenAPI specification in JSON format at:

```
http://localhost:8090/swagger.json
```

### Main Entities

The API follows a hierarchy of entities:

1. **Organizations**
2. **Sites**
3. **Measuring Points**
4. **Boards**
5. **Sensors**

Each level can have zero or more entities of the next level.

#### Available Sensor Types

Sensors can be of the following types:
- `TEMPERATURE` - Temperature sensor
- `HUMIDITY` - Humidity sensor
- `PH` - pH sensor 