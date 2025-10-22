import mongoose from 'mongoose'
import {beforeEach, test, after} from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import {blogs, blogsInDb} from './test_helper.js'


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

after(async () => {
    await mongoose.connection.close()
})
