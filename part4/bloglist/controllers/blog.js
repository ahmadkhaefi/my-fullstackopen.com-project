import {Router} from 'express'
import Blog from '../models/blog.js'

const blogRoute = Router()

blogRoute.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRoute.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
})

export default blogRoute
