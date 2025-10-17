import express, {json} from 'express'
import * as config from './utils/config.js'
import blogRouter from './controllers/blog.js'
import './mongodb.js'

const app = express()

app.use(json())

// Routes
app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
