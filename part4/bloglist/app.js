import express, {json} from 'express'
import blogRouter from './controllers/blog.js'
import './mongodb.js'

const app = express()

app.use(json())

// Routes
app.use('/api/blogs', blogRouter)

export default app
