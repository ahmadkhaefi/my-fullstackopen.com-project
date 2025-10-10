import mongoose from 'mongoose'

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(encodeURI(url))
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Failed to connect to MongoDB', error)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person
