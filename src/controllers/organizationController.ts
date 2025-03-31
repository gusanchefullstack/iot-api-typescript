import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todas las organizaciones
export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error: any) {
    console.error('Error al obtener organizaciones:', error);
    res.status(500).json({ error: 'Error al obtener organizaciones' });
  }
};

// Obtener una organización por ID
export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: { sites: true }
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }

    res.json(organization);
  } catch (error: any) {
    console.error('Error al obtener la organización:', error);
    res.status(500).json({ error: 'Error al obtener la organización' });
  }
};

// Crear una nueva organización
export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    const organization = await prisma.organization.create({
      data: {
        name,
        description
      }
    });

    res.status(201).json(organization);
  } catch (error: any) {
    console.error('Error al crear la organización:', error);
    res.status(500).json({ error: 'Error al crear la organización' });
  }
};

// Actualizar una organización
export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description })
      }
    });

    res.json(updatedOrganization);
  } catch (error: any) {
    console.error('Error al actualizar la organización:', error);
    
    // Verificar si es un error de registro no encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }
    
    res.status(500).json({ error: 'Error al actualizar la organización' });
  }
};

// Eliminar una organización
export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.organization.delete({
      where: { id }
    });

    res.json({ message: 'Organización eliminada correctamente' });
  } catch (error: any) {
    console.error('Error al eliminar la organización:', error);
    
    // Verificar si es un error de registro no encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }
    
    res.status(500).json({ error: 'Error al eliminar la organización' });
  }
}; 