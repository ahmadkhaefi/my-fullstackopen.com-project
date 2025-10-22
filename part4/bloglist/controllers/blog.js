import {Router} from 'express'
import Blog from '../models/blog.js'

const blogRoute = Router()

blogRoute.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()

    response.status(201).json(newBlog)
})

export default blogRoute
