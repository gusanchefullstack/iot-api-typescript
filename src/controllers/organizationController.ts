import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

// Obtener todas las organizaciones
export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las organizaciones' });
  }
};

// Obtener una organización por ID
export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de organización inválido' });
    }

    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la organización' });
  }
};

// Crear una nueva organización
export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, country, state, city, address, zipcode } = req.body;

    if (!name || !country || !state || !city || !address || !zipcode) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        country,
        state,
        city,
        address,
        zipcode,
      },
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la organización' });
  }
};

// Actualizar una organización
export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de organización inválido' });
    }

    const { name, country, state, city, address, zipcode } = req.body;

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name,
        country,
        state,
        city,
        address,
        zipcode,
      },
    });

    res.json(organization);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }
    res.status(500).json({ message: 'Error al actualizar la organización' });
  }
};

// Eliminar una organización
export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de organización inválido' });
    }

    await prisma.organization.delete({
      where: { id },
    });

    res.json({ message: 'Organización eliminada exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }
    res.status(500).json({ message: 'Error al eliminar la organización' });
  }
}; 