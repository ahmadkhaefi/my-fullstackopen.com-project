import express, {json} from 'express'
import mongoose from 'mongoose'
import blogRouter from './controllers/blog.js'
import userRouter from './controllers/user.js'
import * as logger from './utils/logger.js'
import * as middlewares from './utils/middlewares.js'
import './mongodb.js'

const app = express()

app.use(json())

// Routes
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

// Middlewares
app.use(middlewares.errorHandler)

export default app
