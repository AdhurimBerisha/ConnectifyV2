// bookRoutes.js
import express from 'express';
import { getAllBooks, addBook, deleteBook, updateBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;
