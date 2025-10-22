import mongoose from 'mongoose'
import {beforeEach, test, after} from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import {blogs, blogsInDb, singleBlog} from './test_helper.js'


const api = supertest(app)

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
    
    assert(blogsAtEnd.some(blog => {
        const blogObject = blog.toJSON()

        delete blogObject.id

        return JSON.stringify(blogObject) === JSON.stringify(singleBlog)
    }))
})

test('a blog without like can be added and likes defaulted to 0', async () => {
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

after(async () => {
    await mongoose.connection.close()
})
