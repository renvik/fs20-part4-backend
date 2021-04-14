const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// user log in -route: http://localhost:3001/api/users/, only registered users can log in
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const correctpwd = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && correctpwd)){
    return response.status(401).json({ error: 'Invalid password or username' })
  }
  response.status(200).json({ info: 'welcome!' })
})

// user registration -route, http://localhost:3001/api/users/registration/
usersRouter.post('/registration', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  if(body.username === undefined || body.password.length < 3){
    return response.status(400).json({ error: 'Invalid user name or password', name: 'validation error' })
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(200).json(savedUser)
})
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter