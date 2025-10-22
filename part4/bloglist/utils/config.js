import 'dotenv/config.js'

export const {PORT} = process.env

export const MONGO_URI = process.env.NODE_ENV === 'test' ?
    process.env.TEST_MONGO_URI :
    process.env.MONGO_URI
