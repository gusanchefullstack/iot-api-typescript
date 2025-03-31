import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Definición del enum SensorType basado en el schema de Prisma
enum SensorType {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  PH = 'PH'
}

// Obtener todos los sensores
export const getAllSensors = async (req: Request, res: Response) => {
  try {
    const sensors = await prisma.sensor.findMany();
    res.json(sensors);
  } catch (error) {
    console.error('Error getting sensors:', error);
    res.status(500).json({ error: 'Error getting sensors' });
  }
};

// Obtener sensores por placa
export const getSensorsByBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    
    const sensors = await prisma.sensor.findMany({
      where: { boardId }
    });
    
    res.json(sensors);
  } catch (error) {
    console.error('Error getting sensors by board:', error);
    res.status(500).json({ error: 'Error getting sensors by board' });
  }
};

// Obtener un sensor por ID
export const getSensorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const sensor = await prisma.sensor.findUnique({
      where: { id },
      include: { 
        board: true
      }
    });

    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    res.json(sensor);
  } catch (error) {
    console.error('Error getting sensor:', error);
    res.status(500).json({ error: 'Error getting sensor' });
  }
};

// Crear un nuevo sensor
export const createSensor = async (req: Request, res: Response) => {
  try {
    const { name, description, unit, type, boardId } = req.body;
    
    if (!name || !boardId || !type) {
      return res.status(400).json({ 
        error: 'Sensor name, board ID, and type are required' 
      });
    }

    // Verificar que el tipo de sensor sea válido
    if (!Object.values(SensorType).includes(type as SensorType)) {
      return res.status(400).json({
        error: 'Invalid sensor type. Valid types are: ' + Object.values(SensorType).join(', ')
      });
    }

    // Verificar que la placa existe
    const boardExists = await prisma.board.findUnique({
      where: { id: boardId }
    });

    if (!boardExists) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Crear el sensor con los datos básicos
    const sensor = await prisma.sensor.create({
      data: {
        name,
        type: type as SensorType,
        description,
        unit,
        board: {
          connect: { id: boardId }
        }
      }
    });

    res.status(201).json(sensor);
  } catch (error) {
    console.error('Error creating sensor:', error);
    res.status(500).json({ error: 'Error creating sensor' });
  }
};

// Actualizar un sensor
export const updateSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, unit, type } = req.body;
    
    const sensorExists = await prisma.sensor.findUnique({
      where: { id }
    });

    if (!sensorExists) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    // Verificar que el tipo de sensor sea válido si se proporciona
    if (type && !Object.values(SensorType).includes(type as SensorType)) {
      return res.status(400).json({
        error: 'Invalid sensor type. Valid types are: ' + Object.values(SensorType).join(', ')
      });
    }

    const updateData: any = {
      name,
      description,
      unit
    };

    // Añadir el tipo si se proporciona
    if (type) {
      updateData.type = type as SensorType;
    }

    const updatedSensor = await prisma.sensor.update({
      where: { id },
      data: updateData
    });

    res.json(updatedSensor);
  } catch (error) {
    console.error('Error updating sensor:', error);
    res.status(500).json({ error: 'Error updating sensor' });
  }
};

// Eliminar un sensor
export const deleteSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const sensorExists = await prisma.sensor.findUnique({
      where: { id }
    });

    if (!sensorExists) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    await prisma.sensor.delete({
      where: { id }
    });

    res.json({ message: 'Sensor successfully deleted' });
  } catch (error) {
    console.error('Error deleting sensor:', error);
    res.status(500).json({ error: 'Error deleting sensor' });
  }
};

// Obtener los tipos de sensor
export const getSensorTypes = async (req: Request, res: Response) => {
  try {
    // Devolver los tipos de sensor definidos en el enum
    res.json(Object.values(SensorType));
  } catch (error) {
    console.error('Error getting sensor types:', error);
    res.status(500).json({ error: 'Error getting sensor types' });
  }
}; 