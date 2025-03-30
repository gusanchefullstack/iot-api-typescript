import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Obtener todos los sitios
export const getAllSites = async (req: Request, res: Response) => {
  try {
    const sites = await prisma.site.findMany();
    res.json(sites);
  } catch (error) {
    console.error('Error al obtener sitios:', error);
    res.status(500).json({ error: 'Error al obtener sitios' });
  }
};

// Obtener todos los sitios de una organización
export const getSitesByOrganization = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    
    const sites = await prisma.site.findMany({
      where: { organizationId }
    });
    
    res.json(sites);
  } catch (error) {
    console.error('Error al obtener sitios:', error);
    res.status(500).json({ error: 'Error al obtener sitios' });
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
      return res.status(404).json({ error: 'Sitio no encontrado' });
    }

    res.json(site);
  } catch (error) {
    console.error('Error al obtener el sitio:', error);
    res.status(500).json({ error: 'Error al obtener el sitio' });
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
      return res.status(404).json({ error: 'La organización no existe' });
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
    console.error('Error al crear el sitio:', error);
    res.status(500).json({ error: 'Error al crear el sitio' });
  }
};

// Actualizar un sitio
export const updateSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del sitio es requerido' });
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
    console.error('Error al actualizar el sitio:', error);
    res.status(500).json({ error: 'Error al actualizar el sitio' });
  }
};

// Eliminar un sitio
export const deleteSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.site.delete({
      where: { id }
    });

    res.json({ message: 'Sitio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el sitio:', error);
    res.status(500).json({ error: 'Error al eliminar el sitio' });
  }
}; 