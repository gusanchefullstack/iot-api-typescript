import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todas las placas
export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    console.error('Error al obtener placas:', error);
    res.status(500).json({ error: 'Error al obtener placas' });
  }
};

// Obtener todas las placas de un punto de medición
export const getBoardsByMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { measuringPointId } = req.params;
    
    const boards = await prisma.board.findMany({
      where: { measuringPointId }
    });
    
    res.json(boards);
  } catch (error) {
    console.error('Error al obtener placas:', error);
    res.status(500).json({ error: 'Error al obtener placas' });
  }
};

// Obtener una placa por ID
export const getBoardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const board = await prisma.board.findUnique({
      where: { id },
      include: { 
        measuringPoint: true,
        sensors: true
      }
    });

    if (!board) {
      return res.status(404).json({ error: 'Placa no encontrada' });
    }

    res.json(board);
  } catch (error) {
    console.error('Error al obtener la placa:', error);
    res.status(500).json({ error: 'Error al obtener la placa' });
  }
};

// Crear una nueva placa
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name, serialNumber, firmwareVersion, description, status, measuringPointId } = req.body;
    
    if (!name || !measuringPointId) {
      return res.status(400).json({ 
        error: 'El nombre de la placa y el ID del punto de medición son requeridos' 
      });
    }

    // Verificar que el punto de medición existe
    const measuringPointExists = await prisma.measuringPoint.findUnique({
      where: { id: measuringPointId }
    });

    if (!measuringPointExists) {
      return res.status(404).json({ error: 'El punto de medición no existe' });
    }

    const board = await prisma.board.create({
      data: {
        name,
        serialNumber,
        firmwareVersion,
        description,
        status,
        measuringPoint: {
          connect: { id: measuringPointId }
        }
      }
    });

    res.status(201).json(board);
  } catch (error) {
    console.error('Error al crear la placa:', error);
    res.status(500).json({ error: 'Error al crear la placa' });
  }
};

// Actualizar una placa
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, serialNumber, firmwareVersion, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la placa es requerido' });
    }

    const updatedBoard = await prisma.board.update({
      where: { id },
      data: {
        name,
        serialNumber,
        firmwareVersion,
        description,
        status
      }
    });

    res.json(updatedBoard);
  } catch (error) {
    console.error('Error al actualizar la placa:', error);
    res.status(500).json({ error: 'Error al actualizar la placa' });
  }
};

// Eliminar una placa
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.board.delete({
      where: { id }
    });

    res.json({ message: 'Placa eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la placa:', error);
    res.status(500).json({ error: 'Error al eliminar la placa' });
  }
}; 