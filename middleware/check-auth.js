// This scope act as a middle man to verify if user is authorized to make such request.

const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'secret-this-should-be-longer=')
    // console.log(decodedToken)
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'You are not authenticated!' })
  }
}

module.exports = checkAuth
