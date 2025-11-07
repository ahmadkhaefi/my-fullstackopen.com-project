import mongoose from 'mongoose'
import {beforeEach, test, after, describe} from 'node:test'
import assert from 'node:assert'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import * as helper from './test_helper.js'
import api from './api.js'

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // create author use
    const author = new User({
        username: 'root',
        password: 'xxx'
    })

    const createdAuthor = await author.save()

    for (const blog of helper.blogs) {
        blog.author = createdAuthor.id

        await new Blog(blog).save()
    }
})

test('all blogs can be retrieved from database', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.blogs.length)
})

test('id is the unique identifier property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)

    for (const id of ids) {
        const {_id} = await Blog.findById(id)

        assert.strictEqual(_id.toString(), id)
    }
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'TITLE',
        likes: 0,
        url: 'URL'
    }

    await api
        .post('/api/blogs')
        .set('authorization', `bearer ${await helper.generateAuthorToken()}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)
    assert(blogsAtEnd.some(blog => blog.title === newBlog.title))
})

test('a blog cannot be created without token', async () => {
    const newBlog = {
        title: 'TITLE',
        likes: 0,
        url: 'URL'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

test('a blog without likes can be added and likes defaulted to 0', async () => {
    const newBlog = {
        title: 'TITLE',
        url: 'URL'
    }

    await api
        .post('/api/blogs')
        .set('authorization', `bearer ${await helper.generateAuthorToken()}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

    assert.strictEqual(addedBlog.likes, 0)
})

describe('a blog without url and/or title cannot be saved', () => {
    async function testInvalidBlog(blog) {
        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${await helper.generateAuthorToken()}`)
            .send(blog)
            .expect(400)
    }

    test('without url', async () => {
        const newBlog = {
            title: 'TITLE',
            likes: 0
        }

        await testInvalidBlog(newBlog)
    })

    test('without title', async () => {
        const newBlog = {
            url: 'URL',
            likes: 0
        }

        await testInvalidBlog(newBlog)
    })

    test('without title and url', async () => {
        const newBlog = {
            likes: 0
        }

        await testInvalidBlog(newBlog)
    })
})


describe('blog deletion', () => {
    test('an already existing blog can be deleted by id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blog.id}`)
            .set('authorization', `bearer ${await helper.generateAuthorToken()}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert(!blogsAtEnd.some(i => i.id === blog.id))
    })

    test('a non-existing blog cannot be deleted', async () => {
        const id = await helper.nonExistingBlogId()

        await api
            .delete(`/api/blogs/${id}`)
            .set('authorization', `bearer ${await helper.generateAuthorToken()}`)
            .expect(404)
    })
})

test('the likes property of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]
    const newLikes = 10

    await api
        .patch(`/api/blogs/${blog.id}`)
        .send({likes: newLikes})
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const {likes} = await Blog.findById(blog.id)

    assert.strictEqual(likes, newLikes)
})

after(async () => {
    await mongoose.connection.close()
})
