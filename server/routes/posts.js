import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
} from '../controllers/postController.js';
import { postValidation } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, postValidation, createPost);
router.put('/:id', protect, postValidation, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', addComment);
router.post('/:id/like', likePost);

export default router;