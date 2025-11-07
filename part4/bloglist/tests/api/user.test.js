import mongoose from 'mongoose'
import {beforeEach, test, after, describe} from 'node:test'
import assert from 'node:assert'
import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import api from './api.js'
import ERROR_CODES from '../../utils/ERROR_CODES.js'
import * as helper from '../helper.js'

describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        // create root user
        const passwordHash = await bcrypt.hash('SECRET', 10)

        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('valid user can be saved into database', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ahmad',
            name: 'Ahmad',
            password: '123' 
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
        assert(usersAtEnd.map(i => i.username).includes(newUser.username))
    })

    test('user with duplicate username cannot be saved into database', async () => {
        const newUser = {
            username: 'root',
            password: '123'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        assert.strictEqual(
            response.body.error.code,
            ERROR_CODES.API.USER.USERNAME.USERNAME_FIELD_DUPLICATE.code
        )
    })

    test('user with too short username cannot be saved into database', async () => {
        const newUser = {
            username: 'x',
            password: '123'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        assert.strictEqual(
            response.body.error.errors['username'].message,
            ERROR_CODES.API.USER.USERNAME.USERNAME_TOO_SHORT.code
        )
    })

    test('user with too short password cannot be saved into database', async () => {
        const newUser = {
            username: 'ahmad',
            password: 'x'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        assert.strictEqual(
            response.body.error.code,
            ERROR_CODES.API.USER.PASSWORD.PASSWORD_FIELD_NOT_VALID.code
        )
    })
})

after(async () => {
    await mongoose.connection.close()
})
