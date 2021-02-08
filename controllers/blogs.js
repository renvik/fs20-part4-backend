// place for routes, notesRouter (a router object) exports router, all routes are connected to notesRouter-object

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
  .find({})
  .then(blogs => {
      response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
  
    const blog = new Blog(request.body)
    
      blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  module.exports = blogsRouter

