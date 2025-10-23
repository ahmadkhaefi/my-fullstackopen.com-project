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

blogRoute.delete('/:id', async (request, response, next) => {
    const {id} = request.params

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
        return next()
    }

    response.status(204).end()
})

blogRoute.patch('/:id', async (request, response) => {
    const {likes} = request.body
    const {id} = request.params

    const blog = await Blog.findById(id)

    if (!blog) {
        return next()
    }

    blog.likes = likes

    const updatedBlog = await blog.save()

    response.send(updatedBlog)
})

export default blogRoute
