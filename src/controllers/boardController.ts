import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { BoardInput, BoardUpdateInput, BoardStatus } from '../schemas/boardSchema';

const prisma = new PrismaClient();

// Obtener todas las placas
export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        measuringPoint: true,
        sensors: true,
      },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las placas' });
  }
};

// Obtener todas las placas de un punto de medición
export const getBoardsByMeasuringPoint = async (req: Request, res: Response) => {
  try {
    const { measuringPointId } = req.params;
    if (!ObjectId.isValid(measuringPointId)) {
      return res.status(400).json({ message: 'ID de punto de medición inválido' });
    }
    
    const boards = await prisma.board.findMany({
      where: { measuringPointId },
      include: {
        measuringPoint: true,
        sensors: true,
      },
    });
    
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las placas del punto de medición' });
  }
};

// Obtener una placa por ID
export const getBoardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de placa inválido' });
    }
    
    const board = await prisma.board.findUnique({
      where: { id },
      include: { 
        measuringPoint: true,
        sensors: true
      }
    });

    if (!board) {
      return res.status(404).json({ message: 'Placa no encontrada' });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la placa' });
  }
};

// Crear una nueva placa
export const createBoard = async (req: Request<{}, {}, BoardInput>, res: Response) => {
  try {
    // Verificar que el punto de medición existe
    const measuringPointExists = await prisma.measuringPoint.findUnique({
      where: { id: req.body.measuringPointId }
    });

    if (!measuringPointExists) {
      return res.status(404).json({ message: 'Punto de medición no encontrado' });
    }

    // Asignar valor por defecto al status si no viene en la petición
    const status = req.body.status || 'active';
    
    // Validar que el status sea uno de los valores permitidos
    if (!BoardStatus.safeParse(status).success) {
      return res.status(400).json({ message: 'Estado inválido. Valores permitidos: active, inactive, maintenance' });
    }

    const board = await prisma.board.create({
      data: {
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        firmwareVersion: req.body.firmwareVersion,
        description: req.body.description,
        status,
        measuringPoint: {
          connect: { id: req.body.measuringPointId }
        }
      },
      include: {
        measuringPoint: true,
        sensors: true,
      },
    });

    res.status(201).json(board);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return res.status(400).json({ message: 'Ya existe una placa con ese número de serie' });
    }
    res.status(500).json({ message: 'Error al crear la placa' });
  }
};

// Actualizar una placa
export const updateBoard = async (req: Request<{ id: string }, {}, BoardUpdateInput>, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de placa inválido' });
    }

    // Validar que el status sea uno de los valores permitidos
    if (req.body.status && !BoardStatus.safeParse(req.body.status).success) {
      return res.status(400).json({ message: 'Estado inválido. Valores permitidos: active, inactive, maintenance' });
    }

    const updateData: any = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.serialNumber) updateData.serialNumber = req.body.serialNumber;
    if (req.body.firmwareVersion) updateData.firmwareVersion = req.body.firmwareVersion;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.measuringPointId) {
      // Verificar que el punto de medición existe
      const measuringPointExists = await prisma.measuringPoint.findUnique({
        where: { id: req.body.measuringPointId }
      });

      if (!measuringPointExists) {
        return res.status(404).json({ message: 'Punto de medición no encontrado' });
      }

      updateData.measuringPoint = {
        connect: { id: req.body.measuringPointId }
      };
    }

    const board = await prisma.board.update({
      where: { id },
      data: updateData,
      include: {
        measuringPoint: true,
        sensors: true,
      },
    });

    res.json(board);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Placa no encontrada' });
    }
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return res.status(400).json({ message: 'Ya existe una placa con ese número de serie' });
    }
    res.status(500).json({ message: 'Error al actualizar la placa' });
  }
};

// Eliminar una placa
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de placa inválido' });
    }
    
    await prisma.board.delete({
      where: { id }
    });

    res.json({ message: 'Placa eliminada exitosamente' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Placa no encontrada' });
    }
    res.status(500).json({ message: 'Error al eliminar la placa' });
  }
}; 