import {Router} from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('author', {
        blogs: 0
    })

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const author = await User.findOne({username: 'root'})

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
