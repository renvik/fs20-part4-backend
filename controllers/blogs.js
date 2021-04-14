// place for routes, blogsRouter (a router object) exports router, all routes are connected to the blogsRouter-object

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  // if (request.body.title === undefined && request.body.url === undefined) {
  //   response.status(400).json(new Blog(request.body))
  // }else{
  //   if (request.body.likes === undefined) {
  //     request.body.likes = 0
  //   }
  //   // const blog = new Blog(request.body).save()
  //response.status(200).json(blog)

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
// route that enables deleting a blog
blogsRouter.delete('/:id', async (request, response) => {
  // response consists of all the info that the request has, for instance idcreates id variable which consists of
  // uses mongooses model and findByIdAndDelete-function
  await Blog.findByIdAndDelete(request.params.id)
  // response is how the request is responded (both succesfully deleted and failed):. In theory response's object status-method sends code 204
  response.status(204).end()
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