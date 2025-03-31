import { PrismaClient, SensorType, Organization, Site, MeasuringPoint, Board } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/es';

const prisma = new PrismaClient();

// Número de elementos a crear
const NUM_ORGANIZATIONS = 5;
const NUM_SITES_PER_ORG = 3;
const NUM_MEASURING_POINTS_PER_SITE = 4;
const NUM_BOARDS_PER_MEASURING_POINT = 2;
const NUM_SENSORS_PER_BOARD = 3;

async function main() {
  console.log('🌱 Iniciando seeding...');

  // Limpiar la base de datos antes de poblarla
  console.log('🧹 Limpiando la base de datos...');
  await cleanDatabase();

  // Crear organizaciones
  console.log('🏢 Creando organizaciones...');
  const organizations = await createOrganizations();

  // Crear sitios para cada organización
  console.log('🏭 Creando sitios...');
  const sites = await createSites(organizations);

  // Crear puntos de medición para cada sitio
  console.log('📍 Creando puntos de medición...');
  const measuringPoints = await createMeasuringPoints(sites);

  // Crear placas para cada punto de medición
  console.log('🔌 Creando placas...');
  const boards = await createBoards(measuringPoints);

  // Crear sensores para cada placa
  console.log('🌡️ Creando sensores...');
  await createSensors(boards);

  console.log('✅ Seeding completado!');
}

async function cleanDatabase() {
  // Eliminar datos en orden inverso para evitar problemas con las referencias
  await prisma.sensor.deleteMany({});
  await prisma.board.deleteMany({});
  await prisma.measuringPoint.deleteMany({});
  await prisma.site.deleteMany({});
  await prisma.organization.deleteMany({});
}

async function createOrganizations() {
  const organizations: Organization[] = [];

  for (let i = 0; i < NUM_ORGANIZATIONS; i++) {
    const organization = await prisma.organization.create({
      data: {
        name: faker.company.name(),
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        address: faker.location.street(),
        zipcode: faker.location.zipCode(),
        description: faker.company.catchPhrase()
      }
    });
    organizations.push(organization);
  }

  return organizations;
}

async function createSites(organizations: Organization[]) {
  const sites: Site[] = [];

  for (const organization of organizations) {
    for (let i = 0; i < NUM_SITES_PER_ORG; i++) {
      const site = await prisma.site.create({
        data: {
          name: `${faker.location.city()} Site`,
          description: faker.lorem.sentence(),
          location: faker.location.country(),
          organizationId: organization.id
        }
      });
      sites.push(site);
    }
  }

  return sites;
}

async function createMeasuringPoints(sites: Site[]) {
  const measuringPoints: MeasuringPoint[] = [];

  for (const site of sites) {
    for (let i = 0; i < NUM_MEASURING_POINTS_PER_SITE; i++) {
      const measuringPoint = await prisma.measuringPoint.create({
        data: {
          name: `Punto ${faker.lorem.word()} ${i + 1}`,
          description: faker.lorem.sentence(),
          coordinates: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude()
          },
          siteId: site.id,
          organizationId: site.organizationId
        }
      });
      measuringPoints.push(measuringPoint);
    }
  }

  return measuringPoints;
}

async function createBoards(measuringPoints: MeasuringPoint[]) {
  const boards: Board[] = [];

  for (const measuringPoint of measuringPoints) {
    for (let i = 0; i < NUM_BOARDS_PER_MEASURING_POINT; i++) {
      const statusOptions = ['active', 'inactive', 'maintenance'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const board = await prisma.board.create({
        data: {
          name: `Board-${faker.string.alphanumeric(4).toUpperCase()}`,
          serialNumber: faker.string.alphanumeric(10).toUpperCase(),
          firmwareVersion: `v${faker.system.semver()}`,
          description: faker.lorem.sentence(),
          status,
          measuringPointId: measuringPoint.id,
          organizationId: measuringPoint.organizationId
        }
      });
      boards.push(board);
    }
  }

  return boards;
}

async function createSensors(boards: Board[]) {
  const units: Record<SensorType, string> = {
    [SensorType.TEMPERATURE]: '°C',
    [SensorType.HUMIDITY]: '%',
    [SensorType.PH]: 'pH'
  };

  const minValues: Record<SensorType, number> = {
    [SensorType.TEMPERATURE]: -10,
    [SensorType.HUMIDITY]: 0,
    [SensorType.PH]: 0
  };

  const maxValues: Record<SensorType, number> = {
    [SensorType.TEMPERATURE]: 50,
    [SensorType.HUMIDITY]: 100,
    [SensorType.PH]: 14
  };

  for (const board of boards) {
    // Asegurarse de que cada placa tenga al menos un sensor de cada tipo
    const sensorTypes = Object.values(SensorType);
    const selectedTypes: SensorType[] = [];
    
    // Primero, seleccionar tipos únicos para asegurar diversidad
    for (let i = 0; i < Math.min(NUM_SENSORS_PER_BOARD, sensorTypes.length); i++) {
      selectedTypes.push(sensorTypes[i]);
    }
    
    // Si necesitamos más sensores, añadir tipos aleatorios
    for (let i = selectedTypes.length; i < NUM_SENSORS_PER_BOARD; i++) {
      const randomType = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
      selectedTypes.push(randomType);
    }
    
    for (let i = 0; i < NUM_SENSORS_PER_BOARD; i++) {
      const type = selectedTypes[i];
      const statusOptions = ['active', 'inactive', 'maintenance'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      await prisma.sensor.create({
        data: {
          name: `Sensor-${type}-${faker.string.alphanumeric(3).toUpperCase()}`,
          type,
          unit: units[type],
          minValue: minValues[type],
          maxValue: maxValues[type],
          description: faker.lorem.sentence(),
          status,
          boardId: board.id,
          organizationId: board.organizationId
        }
      });
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 