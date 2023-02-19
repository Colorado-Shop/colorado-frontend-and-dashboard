require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const productRoutes = require('./routes/pets')
const userRoutes = require('./routes/user')
const connectDB = require('./db/connect')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/images', express.static(path.join(__dirname, 'images')))
// app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  )
  next()
})

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/products', productRoutes)
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// })

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(
      'mongodb+srv://local-user:Local-2022@shop-store.oewhb.mongodb.net/EcommerceApi?retryWrites=true&w=majority',
    )
    app.listen(port, () => {
      console.log(`Server is listenning on port: ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
