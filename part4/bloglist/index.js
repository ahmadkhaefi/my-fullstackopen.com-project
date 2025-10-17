import express, {json} from 'express'
import {Schema, model, connect} from 'mongoose'
import 'dotenv/config.js'

const {PORT, MONGO_URI} = process.env

const mongoUrl = MONGO_URI

connect(encodeURI(mongoUrl))

const app = express()

const blogSchema = Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = model('Blog', blogSchema)

app.use(json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})