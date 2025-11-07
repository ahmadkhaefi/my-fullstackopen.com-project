import express, {json} from 'express'
import mongoose from 'mongoose'

import blogRouter from './controllers/blog.js'
import userRouter from './controllers/user.js'
import loginRouter from './controllers/login.js'

import * as logger from './utils/logger.js'
import * as middleware from './utils/middleware.js'
import './mongodb.js'

const app = express()

app.use(json())

// Routes
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// Middlewares
app.use(middleware.errorHandler)

export default app
