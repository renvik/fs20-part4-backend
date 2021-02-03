//require('dotenv').config()
//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

const url = process.env.MONGODB_URI 
//console.log("connecting to database ")
// removed url because it shows database's password console.log("connecting to database ", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

//const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })