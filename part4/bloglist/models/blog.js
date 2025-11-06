import {Schema, model} from 'mongoose'

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: Number
})

blogSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id

        delete returnedObject.__v
        delete returnedObject._id
    }
})

/** @type {import('mongoose').Model} */
const Blog = model('Blog', blogSchema)

export default Blog
