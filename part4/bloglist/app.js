import express, {json} from 'express'
import mongoose from 'mongoose'
import blogRouter from './controllers/blog.js'
import './mongodb.js'

const app = express()

app.use(json())

// Routes
app.use('/api/blogs', blogRouter)

// error handling
app.use((error, request, response, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        response.status(400).end()
    }
})

export default app
