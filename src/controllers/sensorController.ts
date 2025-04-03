import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { SensorInput, SensorUpdateInput, SensorType, SensorStatus } from '../schemas/sensorSchema';

const prisma = new PrismaClient();

// Obtener todos los sensores
export const getAllSensors = async (req: Request, res: Response) => {
  try {
    const sensors = await prisma.sensor.findMany({
      include: {
        board: true,
      },
    });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sensores' });
  }
};

// Obtener sensores por placa
export const getSensorsByBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    if (!ObjectId.isValid(boardId)) {
      return res.status(400).json({ message: 'ID de placa inválido' });
    }
    
    const sensors = await prisma.sensor.findMany({
      where: { boardId },
      include: {
        board: true,
      },
    });
    
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sensores de la placa' });
  }
};

// Obtener un sensor por ID
export const getSensorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sensor inválido' });
    }
    
    const sensor = await prisma.sensor.findUnique({
      where: { id },
      include: { 
        board: true,
      }
    });

    if (!sensor) {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }

    res.json(sensor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el sensor' });
  }
};

// Crear un nuevo sensor
export const createSensor = async (req: Request<{}, {}, SensorInput>, res: Response) => {
  try {
    // Verificar que la placa existe
    const boardExists = await prisma.board.findUnique({
      where: { id: req.body.boardId }
    });

    if (!boardExists) {
      return res.status(404).json({ message: 'Placa no encontrada' });
    }

    // Asignar valor por defecto al status si no viene en la petición
    const status = req.body.status || 'active';
    
    // Validación adicional para min/max si ambos están presentes
    if (req.body.minValue !== undefined && req.body.maxValue !== undefined) {
      if (req.body.minValue >= req.body.maxValue) {
        return res.status(400).json({ message: 'El valor máximo debe ser mayor que el valor mínimo' });
      }
    }

    const sensor = await prisma.sensor.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        unit: req.body.unit,
        description: req.body.description,
        minValue: req.body.minValue,
        maxValue: req.body.maxValue,
        status,
        board: {
          connect: { id: req.body.boardId }
        }
      },
      include: {
        board: true,
      },
    });

    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el sensor' });
  }
};

// Actualizar un sensor
export const updateSensor = async (req: Request<{ id: string }, {}, SensorUpdateInput>, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sensor inválido' });
    }

    // Validación adicional para min/max si ambos están presentes
    if (req.body.minValue !== undefined && req.body.maxValue !== undefined) {
      if (req.body.minValue >= req.body.maxValue) {
        return res.status(400).json({ message: 'El valor máximo debe ser mayor que el valor mínimo' });
      }
    }

    const updateData: any = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.unit) updateData.unit = req.body.unit;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.minValue !== undefined) updateData.minValue = req.body.minValue;
    if (req.body.maxValue !== undefined) updateData.maxValue = req.body.maxValue;
    if (req.body.status) updateData.status = req.body.status;
    
    if (req.body.boardId) {
      // Verificar que la placa existe
      const boardExists = await prisma.board.findUnique({
        where: { id: req.body.boardId }
      });

      if (!boardExists) {
        return res.status(404).json({ message: 'Placa no encontrada' });
      }

      updateData.board = {
        connect: { id: req.body.boardId }
      };
    }

    const sensor = await prisma.sensor.update({
      where: { id },
      data: updateData,
      include: {
        board: true,
      },
    });

    res.json(sensor);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }
    res.status(500).json({ message: 'Error al actualizar el sensor' });
  }
};

// Eliminar un sensor
export const deleteSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sensor inválido' });
    }
    
    await prisma.sensor.delete({
      where: { id }
    });

    res.json({ message: 'Sensor eliminado exitosamente' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }
    res.status(500).json({ message: 'Error al eliminar el sensor' });
  }
};

// Obtener los tipos de sensor
export const getSensorTypes = async (_req: Request, res: Response) => {
  try {
    // Devolver los valores del enum de SensorType
    res.json(Object.values(SensorType.enum));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tipos de sensor' });
  }
}; 