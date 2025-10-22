import {connect} from 'mongoose'
import * as config from './utils/config.js'
import * as logger from './utils/logger.js'

const mongoUrl = config.MONGO_URI

connect(encodeURI(mongoUrl))
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    