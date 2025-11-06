import mongoose from 'mongoose'
import {beforeEach, test, after, describe} from 'node:test'
import assert from 'node:assert'
import Blog from '../models/blog.js'
import {blogs, blogsInDb, singleBlog, nonExistingBlogId} from './test_helper.js'
import api from './api.js'

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of blogs) {
        await new Blog(blog).save()
    }
})

test('all blogs can be retrieved from database', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogs.length)
})

test('id the unique identifier property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)

    for (const id of ids) {
        const {_id} = await Blog.findById(id)

        assert.strictEqual(_id.toString(), id)
    }
})

test('a valid blog can be added', async () => {
    await api
        .post('/api/blogs')
        .send(singleBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogs.length + 1)
    
    assert(blogsAtEnd.some(blog => blog.toJSON().title === singleBlog.title))
})

test('a blog without likes can be added and likes defaulted to 0', async () => {
    const newBlog = structuredClone(singleBlog)

    delete newBlog.likes

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

    assert.strictEqual(addedBlog.likes, 0)
})

describe('a blog without url and title cannot be saved', () => {
    async function testInvalidBlog(blog) {
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    }

    test('without url', async () => {
        const newBlog = structuredClone(singleBlog)

        delete newBlog.url

        await testInvalidBlog(newBlog)

    })

    test('without title', async () => {
        const newBlog = structuredClone(singleBlog)

        delete newBlog.title

        await testInvalidBlog(newBlog)

    })

    test('without title and url', async () => {
        const newBlog = structuredClone(singleBlog)

        delete newBlog.title
        delete newBlog.url

        await testInvalidBlog(newBlog)
    })
})

describe('blog deletion', () => {
    test('an already existing blog can be deleted by id', async () => {
        const blogsAtStart = await blogsInDb()

        const blogToBeDeleted = blogsAtStart[0].toJSON()

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .expect(204)

        const blogsAtEnd = await blogsInDb()

        assert(!blogsAtEnd.some(blog => blog.id === blogToBeDeleted.id))
    })

    test('a non-existing blog cannot be deleted', async () => {
        const id = await nonExistingBlogId()

        await api
            .delete(`/api/blogs/${id}`)
            .expect(404)
    })
})

test('the likes property of a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToBeUpdated = blogsAtStart[0].toJSON()
    const blogToBeUpdatedId = blogToBeUpdated.id
    const newLikes = 10

    await api
        .patch(`/api/blogs/${blogToBeUpdatedId}`)
        .send({likes: newLikes})
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const {likes} = (await Blog.findById(blogToBeUpdatedId)).toJSON()

    assert.strictEqual(likes, newLikes)
})

after(async () => {
    await mongoose.connection.close()
})
