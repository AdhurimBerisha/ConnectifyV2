// bookRoutes.js
import express from 'express';
import { getAllEvents, addEvent, deleteEvent, updateEvent } from '../controllers/eventController.js'; 

const router = express.Router();

router.get('/', getAllEvents); 
router.post('/', addEvent); 
router.delete('/:id', deleteEvent); 
router.put('/:id', updateEvent); 

export default router;
