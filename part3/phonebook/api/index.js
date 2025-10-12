import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config.js'
import Person, {connectDB} from './models/person.js'

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'))
}

// morgan.token('body', request => {
//     return JSON.stringify(request.body)
// })
// app.use(morgan((tokens, request, response) => {
//     return [
//         tokens.method(request, response),
//         tokens.url(request, response),
//         tokens.status(request, response),
//         tokens.res(request, response, 'content-length'), '-',
//         tokens['response-time'](request, response), 'ms',
//         tokens['body'](request, response)
//     ].join(' ')
// }))

// app.use((request, response, next) => {
//     console.log(request.url, request.method, request.body, new Date())

//     next()
// })

app.get('/api/persons', (request, response) => {
    connectDB()
        .then(() => {
            Person
                .find({})
                .then(persons => {
                    response.json(persons)
                })
        })
})

app.get('/api/persons/:id', async (request, response, next) => {
    const {id} = request.params

    try {
        await connectDB()
        const person = await Person.findById(id)

        if (!person) {
            return next()
        }

        response.json(person)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
    const {id} = request.params

    connectDB()
        .then(() => {
            Person.findByIdAndDelete(id)
                .then(deletedPerson => {
                    response.json(deletedPerson)
                })
                .catch(error => next(error))
        })
})

app.post('/api/persons', async (request, response) => {
    await connectDB()

    const {number, name} = request.body

    if ((await Person.find({})).some(person => person.name === name)) {
        return response
            .status(400)
            .json({error: 'name must be unique'})
    }

    if (typeof name === 'undefined' || typeof number === 'undefined') {
        return response
            .status(400)
            .json({error: 'name or number missing'})
    }

    new Person({
        number,
        name,
        id: generateId()
    })
        .save()
        .then(savePerson => {
            response.send(savePerson)
        })
})

app.put('/api/persons/:id', async (request, response, next) => {
    await connectDB()

    const {id} = request.params
    const {number} = request.body

    Person.findById(id)
        .then(person => {
            if (!person) {
                return next()
            }
            
            person.number = number

            person.save()
                .then(returnedPerson => {
                    response.json(returnedPerson)
                })
        })
        .catch(error => next(error))
})

app.get('/info', async (request, response) => {
    await connectDB()

    Person.countDocuments()
        .then(personsCount => {
            const timeNow = new Date()

            response.send(`Phone book has info for ${personsCount} people.<br/>${timeNow}`)
        })
})

// requests with unknown endpoint middleware (404 errors)
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

// error handling middleware (500 errors)
app.use((error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'mal-formatted id'})
    }

    next(error)
})

app.listen(3000, () => {
    console.log(`Server running on port 3000.`)
})

export default app
