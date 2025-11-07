import Blog from '../models/blog.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    } 
]

export const listWithOneBlog = [{
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
}]

export async function blogsInDb() {
    return await Blog.find({})
}

export async function nonExistingBlogId() {
    const author = await User.find({username: 'root'})

    const blog = new Blog({
        url: 'URL',
        author: author.id,
        title: 'TITLE'
    })

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

export async function usersInDb() {
    return await User.find({})
}

export async function generateAuthorToken() {
    const author = await User.findOne({username: 'root'})

    const token = jwt.sign({
        username: author.username,
        id: author.id
    }, process.env.JWT)

    return token
}
