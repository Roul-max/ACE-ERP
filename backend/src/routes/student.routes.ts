import express from 'express';
import { create, getAll, update, remove } from '../controllers/student.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.post('/', create);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;