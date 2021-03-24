// login route
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// looks up if username and pswd are in database
loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  // creates token with username and user id (if successful login)
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // token is signed digitally with secret in env
  const token = jwt.sign(userForToken, process.env.SECRET)
  // status-code 200 and token are sent to browser
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter