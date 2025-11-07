import {MongoServerError} from 'mongodb'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import * as logger from './logger.js'
import ERROR_CODES from './ERROR_CODES.js'
import User from '../models/user.js'

export function errorHandler(error, request, response, next) {
    switch (true) {
        case error instanceof mongoose.Error.ValidationError:
            return response
                .status(400)
                .json({error})
        case error instanceof MongoServerError && error.code === 11000:
            return response
                .status(400)
                .json({
                    error: ERROR_CODES.API.USER.USERNAME.USERNAME_FIELD_DUPLICATE
                })
        case error instanceof jwt.JsonWebTokenError:
            return response
                .status(401)
                .json({
                    error: ERROR_CODES.API.USER.TOKEN_NOT_VALID
                })
        default:
            break
    }

    logger.error(error)
}

// `authorization` is an alternative name for `userExtractor` mentioned in exercise 4.22
export async function authorization(request, response, next) {
    let token = request.header('authorization')
    const bearerPattern = /^bearer\s/i

    if (bearerPattern.test(token)) {
        token = token.replace(bearerPattern, '')    
    }

    const decoded = jwt.verify(token, process.env.JWT)

    if (!decoded?.id) {
        return response
            .status(401)
            .json({
                error: ERROR_CODES.API.USER.TOKEN_NOT_VALID
            })
    }

    const user = await User.findById(decoded.id)

    if (!user) {
        return response
            .status(400)
            .json({
                error: ERROR_CODES.API.USER.USER_NOT_FOUND
            })
    }

    request.author = user
    next()
}
