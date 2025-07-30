import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const app = express()

app.use(express.json())
app.use(cors())

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
    response.send(persons)
})

app.get('/api/persons/:id', (request, response, next) => {
    const {id} = request.params

    const person = persons.find(person => person.id === id)

    if (!person) {
        return next()
    }

    response.send(person)
})

app.delete('/api/persons/:id', (request, response, next) => {
    const {id} = request.params

    const person = persons.find(person => person.id === id)

    persons = persons.filter(person => person.id !== id)

    response.json(person)
})

app.post('/api/persons', (request, response) => {
    function generateId() {
        const idLength = 20

        return (Math.random() * (10 ** idLength))
            .toString(16)
            .substring(0, idLength)
    }

    const {number, name} = request.body

    if (persons.some(person => person.name === name)) {
        return response
            .status(400)
            .json({error: 'name must be unique'})
    }

    if (typeof name === 'undefined' || typeof number === 'undefined') {
        return response
            .status(400)
            .json({error: 'name or number missing'})
    }

    const person = {
        number,
        name,
        id: generateId()
    }

    persons.push(person)

    response.send(person)
})

app.get('/info', (request, response) => {
    const personsCount = persons.length
    const timeNow = new Date()

    response.send(`Phone book has info for ${personsCount} people.<br/>${timeNow}`)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
