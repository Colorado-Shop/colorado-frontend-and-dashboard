const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const creatUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist) {
      res.status(401).json({ message: 'Email exists already' })
    }

    const user = await User.create({ email, password })
    res.status(200).json({ message: 'User Created', user: user })
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).json({ message: 'Please provide email and password' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Invalid Credentials' })
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      'secret-this-should-be-longer=',
      { expiresIn: '5h' },
    )

    res.status(200).json({
      token: token,
      expiresIn: '36000',
      userId: user._id,
      message: 'User logged in',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loginUser,
  creatUser,
}
