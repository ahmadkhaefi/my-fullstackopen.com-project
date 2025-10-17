import {Schema, model} from 'mongoose'

const blogSchema = Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id

        delete returnedObject.__v
        delete returnedObject._id
    }
})

export const Blog = model('Blog', blogSchema)
