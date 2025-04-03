import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { MeasuringPointInput, MeasuringPointUpdateInput } from '../schemas/measuringPointSchema';

const prisma = new PrismaClient();

// Obtener todos los puntos de medición
export const getAllMeasuringPoints = async (req: Request, res: Response) => {
  try {
    const measuringPoints = await prisma.measuringPoint.findMany({
      include: {
        site: true,
      },
    });
    res.json(measuringPoints);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los puntos de medición' });
  }
};

// Obtener todos los puntos de medición de un sitio
export const getMeasuringPointsBySite = async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;
    if (!ObjectId.isValid(siteId)) {
      return res.status(400).json({ message: 'ID de sitio inválido' });
    }
    
    const measuringPoints = await prisma.measuringPoint.findMany({
      where: { siteId },
      include: {
        site: true,
      },
    });
    
    res.json(measuringPoints);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los puntos de medición del sitio' });
  }
};

// Obtener un punto de medición por ID
export const getMeasuringPointById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de punto de medición inválido' });
    }
    
    const measuringPoint = await prisma.measuringPoint.findUnique({
      where: { id },
      include: {
        site: true,
      },
    });

    if (!measuringPoint) {
      return res.status(404).json({ message: 'Punto de medición no encontrado' });
    }

    res.json(measuringPoint);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el punto de medición' });
  }
};

// Crear un nuevo punto de medición
export const createMeasuringPoint = async (req: Request<{}, {}, MeasuringPointInput>, res: Response) => {
  try {
    const measuringPoint = await prisma.measuringPoint.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        coordinates: req.body.coordinates,
        site: {
          connect: { id: req.body.siteId }
        }
      },
      include: {
        site: true,
      },
    });

    res.status(201).json(measuringPoint);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }
    res.status(500).json({ message: 'Error al crear el punto de medición' });
  }
};

// Actualizar un punto de medición
export const updateMeasuringPoint = async (req: Request<{ id: string }, {}, MeasuringPointUpdateInput>, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de punto de medición inválido' });
    }

    const updateData: any = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.coordinates) updateData.coordinates = req.body.coordinates;
    if (req.body.siteId) {
      updateData.site = {
        connect: { id: req.body.siteId }
      };
    }

    const measuringPoint = await prisma.measuringPoint.update({
      where: { id },
      data: updateData,
      include: {
        site: true,
      },
    });

    res.json(measuringPoint);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Punto de medición no encontrado' });
    }
    res.status(500).json({ message: 'Error al actualizar el punto de medición' });
  }
};

// Eliminar un punto de medición
export const deleteMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de punto de medición inválido' });
    }
    
    await prisma.measuringPoint.delete({
      where: { id }
    });

    res.json({ message: 'Punto de medición eliminado exitosamente' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Punto de medición no encontrado' });
    }
    res.status(500).json({ message: 'Error al eliminar el punto de medición' });
  }
}; 