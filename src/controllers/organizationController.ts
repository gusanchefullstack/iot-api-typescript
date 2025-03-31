import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todas las organizaciones
export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error: any) {
    console.error('Error getting organizations:', error);
    res.status(500).json({ error: 'Error getting organizations' });
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
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error: any) {
    console.error('Error getting organization:', error);
    res.status(500).json({ error: 'Error getting organization' });
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
    console.error('Error creating organization:', error);
    res.status(500).json({ error: 'Error creating organization' });
  }
};

// Actualizar una organización
export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const organizationExists = await prisma.organization.findUnique({
      where: { id }
    });

    if (!organizationExists) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        name,
        description
      }
    });

    res.json(updatedOrganization);
  } catch (error: any) {
    console.error('Error updating organization:', error);
    res.status(500).json({ error: 'Error updating organization' });
  }
};

// Eliminar una organización
export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const organizationExists = await prisma.organization.findUnique({
      where: { id }
    });

    if (!organizationExists) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    await prisma.organization.delete({
      where: { id }
    });

    res.json({ message: 'Organization successfully deleted' });
  } catch (error: any) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ error: 'Error deleting organization' });
  }
}; 