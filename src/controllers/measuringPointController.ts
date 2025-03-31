import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todos los puntos de medición
export const getAllMeasuringPoints = async (req: Request, res: Response) => {
  try {
    const measuringPoints = await prisma.measuringPoint.findMany();
    res.json(measuringPoints);
  } catch (error) {
    console.error('Error getting measuring points:', error);
    res.status(500).json({ error: 'Error getting measuring points' });
  }
};

// Obtener todos los puntos de medición de un sitio
export const getMeasuringPointsBySite = async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;
    
    const measuringPoints = await prisma.measuringPoint.findMany({
      where: { siteId }
    });
    
    res.json(measuringPoints);
  } catch (error) {
    console.error('Error getting measuring points by site:', error);
    res.status(500).json({ error: 'Error getting measuring points by site' });
  }
};

// Obtener un punto de medición por ID
export const getMeasuringPointById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const measuringPoint = await prisma.measuringPoint.findUnique({
      where: { id },
      include: { 
        site: true,
        boards: true
      }
    });

    if (!measuringPoint) {
      return res.status(404).json({ error: 'Measuring point not found' });
    }

    res.json(measuringPoint);
  } catch (error) {
    console.error('Error getting measuring point:', error);
    res.status(500).json({ error: 'Error getting measuring point' });
  }
};

// Crear un nuevo punto de medición
export const createMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { name, description, coordinates, siteId } = req.body;
    
    if (!name || !siteId) {
      return res.status(400).json({ 
        error: 'El nombre del punto de medición y el ID del sitio son requeridos' 
      });
    }

    // Verificar que el sitio existe
    const siteExists = await prisma.site.findUnique({
      where: { id: siteId }
    });

    if (!siteExists) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const measuringPoint = await prisma.measuringPoint.create({
      data: {
        name,
        description,
        coordinates,
        site: {
          connect: { id: siteId }
        }
      }
    });

    res.status(201).json(measuringPoint);
  } catch (error) {
    console.error('Error creating measuring point:', error);
    res.status(500).json({ error: 'Error creating measuring point' });
  }
};

// Actualizar un punto de medición
export const updateMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, coordinates } = req.body;
    
    const measuringPointExists = await prisma.measuringPoint.findUnique({
      where: { id }
    });

    if (!measuringPointExists) {
      return res.status(404).json({ error: 'Measuring point not found' });
    }

    const updatedMeasuringPoint = await prisma.measuringPoint.update({
      where: { id },
      data: {
        name,
        description,
        coordinates
      }
    });

    res.json(updatedMeasuringPoint);
  } catch (error) {
    console.error('Error updating measuring point:', error);
    res.status(500).json({ error: 'Error updating measuring point' });
  }
};

// Eliminar un punto de medición
export const deleteMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const measuringPointExists = await prisma.measuringPoint.findUnique({
      where: { id }
    });

    if (!measuringPointExists) {
      return res.status(404).json({ error: 'Measuring point not found' });
    }

    await prisma.measuringPoint.delete({
      where: { id }
    });

    res.json({ message: 'Measuring point successfully deleted' });
  } catch (error) {
    console.error('Error deleting measuring point:', error);
    res.status(500).json({ error: 'Error deleting measuring point' });
  }
}; 