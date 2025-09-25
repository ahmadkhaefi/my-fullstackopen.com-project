import mongoose from 'mongoose'

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('Failed to connect to MongoDB')
    })

const Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    number: Number
}))

export default Person
