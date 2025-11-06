import app from '../app.js'
import supertest from 'supertest'

const api = supertest(app)

export default api
