import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todos los puntos de medición
export const getAllMeasuringPoints = async (req: Request, res: Response) => {
  try {
    const measuringPoints = await prisma.measuringPoint.findMany();
    res.json(measuringPoints);
  } catch (error) {
    console.error('Error al obtener puntos de medición:', error);
    res.status(500).json({ error: 'Error al obtener puntos de medición' });
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
    console.error('Error al obtener puntos de medición:', error);
    res.status(500).json({ error: 'Error al obtener puntos de medición' });
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
      return res.status(404).json({ error: 'Punto de medición no encontrado' });
    }

    res.json(measuringPoint);
  } catch (error) {
    console.error('Error al obtener el punto de medición:', error);
    res.status(500).json({ error: 'Error al obtener el punto de medición' });
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
      return res.status(404).json({ error: 'El sitio no existe' });
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
    console.error('Error al crear el punto de medición:', error);
    res.status(500).json({ error: 'Error al crear el punto de medición' });
  }
};

// Actualizar un punto de medición
export const updateMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, coordinates } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del punto de medición es requerido' });
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
    console.error('Error al actualizar el punto de medición:', error);
    res.status(500).json({ error: 'Error al actualizar el punto de medición' });
  }
};

// Eliminar un punto de medición
export const deleteMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.measuringPoint.delete({
      where: { id }
    });

    res.json({ message: 'Punto de medición eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el punto de medición:', error);
    res.status(500).json({ error: 'Error al eliminar el punto de medición' });
  }
}; 