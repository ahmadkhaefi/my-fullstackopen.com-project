import {connect} from 'mongoose'
import * as config from './utils/config.js'

const mongoUrl = config.MONGO_URI

connect(encodeURI(mongoUrl))
    .then(() => {
        console.log('Connected to MongoDB')
    })
    