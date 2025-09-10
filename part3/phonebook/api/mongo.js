import mongoose from 'mongoose'

const [,, password, name, number] = process.argv

const url = `mongodb+srv://ahmadkhaefi:${password}@cluster0.fmu5ypx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    number: Number
}))

if (!number && !name) {
    Person
        .find({})
        .then(persons => {
            console.log('Phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
} else {
    new Person({name, number})
        .save()
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook.`)
            mongoose.connection.close()
        })
}
