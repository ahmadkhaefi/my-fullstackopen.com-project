import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config.js'
import Person from './models/person.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', request => {
    return JSON.stringify(request.body)
})
app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        tokens['body'](request, response)
    ].join(' ')
}))

app.use((request, response, next) => {
    console.log(request.url, request.method, request.body, new Date())

    next()
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.send(persons)
        })
})

app.get('/api/persons/:id', async (request, response, next) => {
    const {id} = request.params

    const person = await Person.findById(id)

    if (!person) {
        return next()
    }

    response.send(person)
})

app.delete('/api/persons/:id', (request, response, next) => {
    const {id} = request.params

    console.log(id)

    // Person.findByIdAndDelete(id)
    //     .then(deletedPerson => {
    //         response.json(deletedPerson)
    //     })
})

app.post('/api/persons', async (request, response) => {
    function generateId() {
        const idLength = 20

        return (Math.random() * (10 ** idLength))
            .toString(16)
            .substring(0, idLength)
    }

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

app.get('/info', (request, response) => {
    Person.countDocuments()
        .then(personsCount => {
            const timeNow = new Date()

            response.send(`Phone book has info for ${personsCount} people.<br/>${timeNow}`)
        })
})

app.listen(3000, () => {
    console.log(`Server running on port 3000.`)
})

export default app
