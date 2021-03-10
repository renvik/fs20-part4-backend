// place for routes, notesRouter (a router object) exports router, all routes are connected to notesRouter-object

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).json(new Blog(request.body))
  }else{
    if (request.body.likes === undefined) {
      request.body.likes = 0
    }
    const blog = new Blog(request.body).save()
    response.status(200).json(blog)
  }
})

module.exports = blogsRouter