// src/routes/productRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createProduct,
  getProductById,
  getActiveProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Define routes
router.post('/', createProduct);
router.get('/:productId', getProductById);
router.get('/', getActiveProducts);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
