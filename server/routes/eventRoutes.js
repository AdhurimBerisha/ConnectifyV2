// bookRoutes.js
import express from 'express';
import { getAllEvents, addEvent, deleteEvent, updateEvent } from '../controllers/eventController.js'; // Change import paths and function names

const router = express.Router();

router.get('/', getAllEvents); // Change route handlers
router.post('/', addEvent); // Change route handlers
router.delete('/:id', deleteEvent); // Change route handlers
router.put('/:id', updateEvent); // Change route handlers

export default router;
