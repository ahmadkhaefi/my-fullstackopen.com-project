import {Schema, model} from 'mongoose'
import ERROR_CODES from '../utils/ERROR_CODES.js'

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, ERROR_CODES.API.USER.USERNAME.USERNAME_TOO_SHORT.code]
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id

        delete returnedObject.__v
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

/** @type {import('mongoose').Model} */
const User = model('User', userSchema)

export default User
