import express from 'express';
import {
  createProduct,
  getAllProducts,
  getUserProducts,
  getByQueryParams,
  editProduct,
  deleteProduct
} from '../controller/productApis/index.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createProduct);
router.get('/', getAllProducts);
router.get('/user', authMiddleware, getUserProducts);
router.get('/search', getByQueryParams);
router.put('/:id', authMiddleware, editProduct);
router.delete('/:id', authMiddleware, deleteProduct);


export default router;
