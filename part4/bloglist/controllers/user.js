import {Router} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import ERROR_CODES from '../utils/ERROR_CODES.js'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const {name, username, password} = request.body

    // validate password
    if (!password || password?.length < 3) {
        return response.status(400).json({
            error: ERROR_CODES.API.USER.PASSWORD.PASSWORD_FIELD_NOT_VALID
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        name,
        username,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

export default userRouter
