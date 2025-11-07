import {json, Router} from 'express'
import Blog from '../models/blog.js'
import ERROR_CODES from '../utils/ERROR_CODES.js'
import {authorization} from '../utils/middlewares.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('author', {
        blogs: 0
    })

    response.json(blogs)
})

// jwt token authorization middleware
blogRouter.use(authorization)

blogRouter.post('/', async (request, response) => {
    const {author} = request

    const {
        title,
        url,
        likes,
    } = request.body

    // save blog
    const blog = new Blog({title, author: author.id, url, likes: likes || 0})
    const newBlog = await blog.save()

    // save blog id into user
    author.blogs.push(blog.id)
    
    await author.save()

    response.status(201).json(newBlog)
})

// jwt authorization
blogRouter.use(authorization)

blogRouter.delete('/:id', async (request, response, next) => {
    const {id: authorId} = request.author
    const {id} = request.params

    const blog = await Blog.findById(id)

    if (!blog) {
        return response
            .status(404)
            .json({
                error: ERROR_CODES.API.BLOG.BLOG_NOT_FOUND
            })
    }

    if (blog.author.toString() !== authorId) {
        return response
            .status(403)
            .json({
                error: ERROR_CODES.API.BLOG.UNAUTHORIZED_DELETION
            })
    }

    await blog.deleteOne()

    response.status(204).end()
})

blogRouter.patch('/:id', async (request, response) => {
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

export default blogRouter
