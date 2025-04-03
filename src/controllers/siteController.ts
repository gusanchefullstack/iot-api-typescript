import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { SiteInput, SiteUpdateInput } from '../schemas/siteSchema';

const prisma = new PrismaClient();

// Obtener todos los sitios
export const getAllSites = async (req: Request, res: Response) => {
  try {
    const sites = await prisma.site.findMany({
      include: {
        organization: true,
        measuringPoints: true,
      },
    });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sitios' });
  }
};

// Obtener sitios por organización
export const getSitesByOrganization = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    if (!ObjectId.isValid(organizationId)) {
      return res.status(400).json({ message: 'ID de organización inválido' });
    }
    
    const sites = await prisma.site.findMany({
      where: { organizationId },
      include: {
        organization: true,
        measuringPoints: true,
      },
    });
    
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sitios de la organización' });
  }
};

// Obtener un sitio por ID
export const getSiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sitio inválido' });
    }
    
    const site = await prisma.site.findUnique({
      where: { id },
      include: { 
        organization: true,
        measuringPoints: true
      }
    });

    if (!site) {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }

    res.json(site);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el sitio' });
  }
};

// Crear un nuevo sitio
export const createSite = async (req: Request<{}, {}, SiteInput>, res: Response) => {
  try {
    const site = await prisma.site.create({
      data: req.body,
      include: {
        organization: true,
        measuringPoints: true,
      },
    });

    res.status(201).json(site);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }
    res.status(500).json({ message: 'Error al crear el sitio' });
  }
};

// Actualizar un sitio
export const updateSite = async (req: Request<{ id: string }, {}, SiteUpdateInput>, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sitio inválido' });
    }

    const site = await prisma.site.update({
      where: { id },
      data: req.body,
      include: {
        organization: true,
        measuringPoints: true,
      },
    });

    res.json(site);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }
    res.status(500).json({ message: 'Error al actualizar el sitio' });
  }
};

// Eliminar un sitio
export const deleteSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sitio inválido' });
    }
    
    await prisma.site.delete({
      where: { id }
    });

    res.json({ message: 'Sitio eliminado exitosamente' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }
    res.status(500).json({ message: 'Error al eliminar el sitio' });
  }
}; 