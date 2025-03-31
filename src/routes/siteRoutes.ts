import { Router } from 'express';
import * as siteController from '../controllers/siteController';

const router = Router();

/**
 * @swagger
 * /sites:
 *   get:
 *     summary: Get all sites
 *     tags: [Sites]
 *     responses:
 *       200:
 *         description: List of sites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', siteController.getAllSites);

/**
 * @swagger
 * /sites/organization/{organizationId}:
 *   get:
 *     summary: Get all sites for an organization
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: List of sites for the organization
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/organization/:organizationId', siteController.getSitesByOrganization);

/**
 * @swagger
 * /sites/{id}:
 *   get:
 *     summary: Get a site by ID
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Site ID
 *     responses:
 *       200:
 *         description: Site details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Site not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', siteController.getSiteById);

/**
 * @swagger
 * /sites:
 *   post:
 *     summary: Create a new site
 *     tags: [Sites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organizationId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Site name
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Site description
 *                 maxLength: 500
 *               location:
 *                 type: string
 *                 description: Site location
 *                 maxLength: 250
 *               organizationId:
 *                 type: string
 *                 description: ID of the organization this site belongs to
 *     responses:
 *       201:
 *         description: Site created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Organization not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', siteController.createSite);

/**
 * @swagger
 * /sites/{id}:
 *   put:
 *     summary: Update a site
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Site ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Site name
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Site description
 *                 maxLength: 500
 *               location:
 *                 type: string
 *                 description: Site location
 *                 maxLength: 250
 *     responses:
 *       200:
 *         description: Site updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Site not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', siteController.updateSite);

/**
 * @swagger
 * /sites/{id}:
 *   delete:
 *     summary: Delete a site
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Site ID
 *     responses:
 *       200:
 *         description: Site deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Site successfully deleted
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Site not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', siteController.deleteSite);

export default router; 