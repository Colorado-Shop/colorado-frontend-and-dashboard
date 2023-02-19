const express = require('express')
const router = express.Router()

const productController = require('../controllers/pet')
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/extract-file')

// router.post('', checkAuth, extractFile, PetController.createAProduct)
// router.patch('/:id', checkAuth, extractFile, PetController.updateProduct)
// router.get('', PetController.getAllProducts)
// router.get('/:id', PetController.getAProduct)
// router.delete('/:id', checkAuth, PetController.deleteProduct)

router
  .route('/')
  .post(checkAuth, extractFile, productController.createAProduct)
  .get(productController.getAllProducts)

router
  .route('/:id')
  .get(productController.getAProduct)
  .patch(checkAuth, extractFile, productController.updateProduct)
  .delete(checkAuth, productController.deleteProduct)

router.route('/category/:category').get(productController.getProductsBycategory)

module.exports = router
