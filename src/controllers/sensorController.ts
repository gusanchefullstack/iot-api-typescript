import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todos los sensores
export const getAllSensors = async (req: Request, res: Response) => {
  try {
    const sensors = await prisma.sensor.findMany();
    res.json(sensors);
  } catch (error) {
    console.error('Error al obtener sensores:', error);
    res.status(500).json({ error: 'Error al obtener sensores' });
  }
};

// Obtener todos los sensores de una placa
export const getSensorsByBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    
    const sensors = await prisma.sensor.findMany({
      where: { boardId }
    });
    
    res.json(sensors);
  } catch (error) {
    console.error('Error al obtener sensores:', error);
    res.status(500).json({ error: 'Error al obtener sensores' });
  }
};

// Obtener un sensor por ID
export const getSensorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const sensor = await prisma.sensor.findUnique({
      where: { id },
      include: { board: true }
    });

    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }

    res.json(sensor);
  } catch (error) {
    console.error('Error al obtener el sensor:', error);
    res.status(500).json({ error: 'Error al obtener el sensor' });
  }
};

// Crear un nuevo sensor
export const createSensor = async (req: Request, res: Response) => {
  try {
    const { name, type, unit, minValue, maxValue, description, status, boardId } = req.body;
    
    if (!name || !type || !boardId) {
      return res.status(400).json({ 
        error: 'El nombre, tipo y ID de la placa son requeridos' 
      });
    }

    // Verificar que la placa existe
    const boardExists = await prisma.board.findUnique({
      where: { id: boardId }
    });

    if (!boardExists) {
      return res.status(404).json({ error: 'La placa no existe' });
    }

    const sensor = await prisma.sensor.create({
      data: {
        name,
        type,
        unit,
        minValue,
        maxValue,
        description,
        status,
        board: {
          connect: { id: boardId }
        }
      }
    });

    res.status(201).json(sensor);
  } catch (error) {
    console.error('Error al crear el sensor:', error);
    res.status(500).json({ error: 'Error al crear el sensor' });
  }
};

// Actualizar un sensor
export const updateSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, unit, minValue, maxValue, description, status } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'El nombre y tipo del sensor son requeridos' });
    }

    const updatedSensor = await prisma.sensor.update({
      where: { id },
      data: {
        name,
        type,
        unit,
        minValue,
        maxValue,
        description,
        status
      }
    });

    res.json(updatedSensor);
  } catch (error) {
    console.error('Error al actualizar el sensor:', error);
    res.status(500).json({ error: 'Error al actualizar el sensor' });
  }
};

// Eliminar un sensor
export const deleteSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.sensor.delete({
      where: { id }
    });

    res.json({ message: 'Sensor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el sensor:', error);
    res.status(500).json({ error: 'Error al eliminar el sensor' });
  }
}; 