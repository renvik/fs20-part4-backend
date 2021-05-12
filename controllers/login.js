const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  // tries to find username in the DB:
  const user = await User.findOne({ username: body.username })
  // checks if the password (compares to hash) is correct:
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  // if username does not exits or password incorrect:
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  // token contents:
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // if succesful login then token is generated and signed
  const token = jwt.sign(userForToken, process.env.SECRET)
  // response to login request, includes token
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter