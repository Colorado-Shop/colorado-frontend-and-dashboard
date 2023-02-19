const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a title'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
    },
    photo: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    description1: {
      type: String,
      required: [true, 'Please provide 1st description'],
    },
    description2: {
      type: String,
      required: [true, 'Please provide 2nd description'],
    },
    prices: [{ unit: String, amount: Number }],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)
