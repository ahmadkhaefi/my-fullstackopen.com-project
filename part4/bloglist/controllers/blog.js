import {json, Router} from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import ERROR_CODES from '../utils/ERROR_CODES.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('author', {
        blogs: 0
    })

    response.json(blogs)
})

// jwt token authorization middleware
blogRouter.use(async (request, response, next) => {
    let token = request.header('authorization')
    const bearerPattern = /^bearer\s/i

    if (bearerPattern.test(token)) {
        token = token.replace(bearerPattern, '')    
    }


    const decoded = jwt.verify(token, process.env.JWT)

    if (!decoded) {
        return response
            .status(401)
            .json({
                error: ERROR_CODES.API.USER.TOKEN_NOT_VALID
            })
    }

    const user = await User.findById(decoded.id)

    if (!user) {
        return response
            .status(400)
            .json({
                error: ERROR_CODES.API.USER.USER_NOT_FOUND
            })
    }

    request.author = user
    next()
})

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

blogRouter.delete('/:id', async (request, response, next) => {
    const {id} = request.params

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
        return next()
    }

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
