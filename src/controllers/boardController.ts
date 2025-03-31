import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todas las placas
export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    console.error('Error getting boards:', error);
    res.status(500).json({ error: 'Error getting boards' });
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
    console.error('Error getting boards by measuring point:', error);
    res.status(500).json({ error: 'Error getting boards by measuring point' });
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
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(board);
  } catch (error) {
    console.error('Error getting board:', error);
    res.status(500).json({ error: 'Error getting board' });
  }
};

// Crear una nueva placa
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name, serialNumber, firmwareVersion, description, status, measuringPointId } = req.body;
    
    if (!name || !measuringPointId) {
      return res.status(400).json({ 
        error: 'Board name and measuring point ID are required' 
      });
    }

    // Verificar que el punto de medición existe
    const measuringPointExists = await prisma.measuringPoint.findUnique({
      where: { id: measuringPointId }
    });

    if (!measuringPointExists) {
      return res.status(404).json({ error: 'Measuring point not found' });
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
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Error creating board' });
  }
};

// Actualizar una placa
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, serialNumber, firmwareVersion, description, status } = req.body;
    
    const boardExists = await prisma.board.findUnique({
      where: { id }
    });

    if (!boardExists) {
      return res.status(404).json({ error: 'Board not found' });
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
    console.error('Error updating board:', error);
    res.status(500).json({ error: 'Error updating board' });
  }
};

// Eliminar una placa
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const boardExists = await prisma.board.findUnique({
      where: { id }
    });

    if (!boardExists) {
      return res.status(404).json({ error: 'Board not found' });
    }

    await prisma.board.delete({
      where: { id }
    });

    res.json({ message: 'Board successfully deleted' });
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: 'Error deleting board' });
  }
}; 