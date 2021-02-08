// //require('dotenv').config()
// //const http = require('http')
// const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const blogsRouter = require('./controllers/blogs')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const mongoose = require('mongoose')

// // logger.info('connecting to')
// logger.info('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error connection to MongoDB:', error.message)
//   })

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

// //const Blog = mongoose.model('Blog', blogSchema)
// //console.log('käykö täällä') 
// app.use('api/blogs', blogsRouter)
// console.log('käykö täällä') 
// app.use(cors())
// app.use(express.json())
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)


// //const PORT = process.env.PORT

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`)
// // })