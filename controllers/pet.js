const Product = require('../models/pets')

const createAProduct = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  let image = req.body.photo
  if (req.file) {
    image = url + '/images/' + req.file.filename
  }
  req.body.photo = image
  // req.body.prices = JSON.parse(req.body.prices)
  const product = await Product.create(req.body)
  res
    .status(200)
    .json({ product: product, message: 'Success! Product created' })
}

const updateProduct = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const { id: productId } = req.params
  let image = req.body.photo
  if (req.file) {
    image = url + '/images/' + req.file.filename
  }
  req.body.photo = image
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!product) {
    res.status(404).json({ message: `No product with id: ${productId}` })
  }
  res
    .status(200)
    .json({ product: product, message: 'Success! Product updated' })
}

const getAllProducts = async (req, res) => {
  const query = req.query.category
  let products
  if (query) {
    products = await Product.find({ category: query })
  } else {
    products = await Product.find({})
  }
  res.status(200).json({ products: products, count: products.length })
}

const getAProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })

  if (!product) {
    res.status(404).json({ message: `No product with id: ${productId}` })
  }
  res.status(200).json({ product: product })
}

const getProductsBycategory = async (req, res) => {
  const products = await Product.find({ category: req.params.category })

  if (!products) {
    res
      .status(404)
      .json({ message: `No products with category: ${productCategory}` })
  }
  res.status(200).json({ products: products })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })

  if (!product) {
    res.status(404).json({ message: `No product with id: ${productId}` })
  }
  await product.remove()
  res.status(200).json({ message: 'Success! Product removed.' })
}

module.exports = {
  createAProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsBycategory,
}
