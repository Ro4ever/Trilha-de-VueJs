const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // Middleware de autenticação
const productController = require('../controllers/productController');

router.get('/', auth, productController.getProducts); // Protegida
router.get('/:id', auth, productController.getProductById); // Protegida
router.post('/', auth, productController.createProduct); // Protegida
router.put('/:id', auth, productController.updateProduct); // Protegida
router.delete('/:id', auth, productController.deleteProduct); // Protegida

module.exports = router;