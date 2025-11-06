import {MongoServerError} from 'mongodb'
import mongoose from 'mongoose'
import * as logger from './logger.js'
import ERROR_CODES from './ERROR_CODES.js'

export function errorHandler(error, request, response, next) {
    if (error instanceof mongoose.Error.ValidationError) {
        response
            .status(400)
            .json({error})
    } else if (error instanceof MongoServerError && error.code === 11000) {
        response
            .status(400)
            .json({
                error: ERROR_CODES.API.USER.USERNAME.USERNAME_FIELD_DUPLICATE
            })
    }

    logger.error(error)
}
