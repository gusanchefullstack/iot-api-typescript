import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todos los sitios
export const getAllSites = async (req: Request, res: Response) => {
  try {
    const sites = await prisma.site.findMany();
    res.json(sites);
  } catch (error) {
    console.error('Error getting sites:', error);
    res.status(500).json({ error: 'Error getting sites' });
  }
};

// Obtener sitios por organización
export const getSitesByOrganization = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    
    const sites = await prisma.site.findMany({
      where: { organizationId }
    });
    
    res.json(sites);
  } catch (error) {
    console.error('Error getting sites by organization:', error);
    res.status(500).json({ error: 'Error getting sites by organization' });
  }
};

// Obtener un sitio por ID
export const getSiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const site = await prisma.site.findUnique({
      where: { id },
      include: { 
        organization: true,
        measuringPoints: true
      }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    res.json(site);
  } catch (error) {
    console.error('Error getting site:', error);
    res.status(500).json({ error: 'Error getting site' });
  }
};

// Crear un nuevo sitio
export const createSite = async (req: Request, res: Response) => {
  try {
    const { name, description, location, organizationId } = req.body;
    
    if (!name || !organizationId) {
      return res.status(400).json({ 
        error: 'El nombre del sitio y el ID de la organización son requeridos' 
      });
    }

    // Verificar que la organización existe
    const organizationExists = await prisma.organization.findUnique({
      where: { id: organizationId }
    });

    if (!organizationExists) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const site = await prisma.site.create({
      data: {
        name,
        description,
        location,
        organization: {
          connect: { id: organizationId }
        }
      }
    });

    res.status(201).json(site);
  } catch (error) {
    console.error('Error creating site:', error);
    res.status(500).json({ error: 'Error creating site' });
  }
};

// Actualizar un sitio
export const updateSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    
    const siteExists = await prisma.site.findUnique({
      where: { id }
    });

    if (!siteExists) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const updatedSite = await prisma.site.update({
      where: { id },
      data: {
        name,
        description,
        location
      }
    });

    res.json(updatedSite);
  } catch (error) {
    console.error('Error updating site:', error);
    res.status(500).json({ error: 'Error updating site' });
  }
};

// Eliminar un sitio
export const deleteSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const siteExists = await prisma.site.findUnique({
      where: { id }
    });

    if (!siteExists) {
      return res.status(404).json({ error: 'Site not found' });
    }

    await prisma.site.delete({
      where: { id }
    });

    res.json({ message: 'Site successfully deleted' });
  } catch (error) {
    console.error('Error deleting site:', error);
    res.status(500).json({ error: 'Error deleting site' });
  }
}; 