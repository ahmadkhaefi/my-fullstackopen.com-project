import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import ERROR_CODES from '../utils/ERROR_CODES.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})

    const passwordCorrect = user === null
        ? false
        : bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
        return response
            .status(401)
            .json({
                error: ERROR_CODES.API.USER.USERNAME_OR_PASSWORD_NOT_VALID
            })
    }

    const token = jwt.sign({
        username: user.username,
        id: user.id
    }, process.env.JWT)

    response.json({token})
})

export default loginRouter
