import {Router} from 'express'
import Blog from '../models/blog.js'

const blogRoute = Router()

blogRoute.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
    const {
        title,
        author,
        url,
        likes,
    } = request.body

    const blog = new Blog({title, author, url, likes: likes || 0})
    const newBlog = await blog.save()

    response.status(201).json(newBlog)
})

export default blogRoute
