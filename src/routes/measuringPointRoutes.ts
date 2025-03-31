import { Router } from 'express';
import * as measuringPointController from '../controllers/measuringPointController';

const router = Router();

/**
 * @swagger
 * /measuring-points:
 *   get:
 *     summary: Get all measuring points
 *     tags: [Measuring Points]
 *     responses:
 *       200:
 *         description: List of measuring points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasuringPoint'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', measuringPointController.getAllMeasuringPoints);

/**
 * @swagger
 * /measuring-points/site/{siteId}:
 *   get:
 *     summary: Get all measuring points for a site
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: siteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Site ID
 *     responses:
 *       200:
 *         description: List of measuring points for the site
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasuringPoint'
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
router.get('/site/:siteId', measuringPointController.getMeasuringPointsBySite);

/**
 * @swagger
 * /measuring-points/{id}:
 *   get:
 *     summary: Get a measuring point by ID
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Measuring point ID
 *     responses:
 *       200:
 *         description: Measuring point details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Measuring point not found
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
router.get('/:id', measuringPointController.getMeasuringPointById);

/**
 * @swagger
 * /measuring-points:
 *   post:
 *     summary: Create a new measuring point
 *     tags: [Measuring Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - siteId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Measuring point name
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Measuring point description
 *                 maxLength: 500
 *               coordinates:
 *                 type: object
 *                 description: Geographic coordinates
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude
 *                   longitude:
 *                     type: number
 *                     description: Longitude
 *               siteId:
 *                 type: string
 *                 description: ID of the site this measuring point belongs to
 *     responses:
 *       201:
 *         description: Measuring point created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
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
router.post('/', measuringPointController.createMeasuringPoint);

/**
 * @swagger
 * /measuring-points/{id}:
 *   put:
 *     summary: Update a measuring point
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Measuring point ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Measuring point name
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 description: Measuring point description
 *                 maxLength: 500
 *               coordinates:
 *                 type: object
 *                 description: Geographic coordinates
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude
 *                   longitude:
 *                     type: number
 *                     description: Longitude
 *     responses:
 *       200:
 *         description: Measuring point updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasuringPoint'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Measuring point not found
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
router.put('/:id', measuringPointController.updateMeasuringPoint);

/**
 * @swagger
 * /measuring-points/{id}:
 *   delete:
 *     summary: Delete a measuring point
 *     tags: [Measuring Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Measuring point ID
 *     responses:
 *       200:
 *         description: Measuring point deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Measuring point successfully deleted
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Measuring point not found
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
router.delete('/:id', measuringPointController.deleteMeasuringPoint);

export default router; 