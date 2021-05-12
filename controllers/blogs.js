// place for routes, blogsRouter (a router object) exports router, all routes are connected to the blogsRouter-object

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

// first token-based authentication, if valid then blog is created
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // token verification and decode (returns decoded object)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// route that deletes a blog, uses mongooses model and findByIdAndDelete-function
blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

// route that enable updating blog's properties
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  // uses mongooses model and findByIdAndUpdate-function
  await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
  // response is how the request is responded (both succesfully deleted and failed):. In theory response's object status-method sends code 204
  response.status(204).end()
})

module.exports = blogsRouter