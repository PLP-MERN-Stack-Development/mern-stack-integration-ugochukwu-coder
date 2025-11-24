import express from 'express';
import {
  getCategories,
  createCategory,
  getCategory
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', protect, createCategory);

export default router;