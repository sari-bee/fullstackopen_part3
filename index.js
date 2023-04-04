require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')
app.use(express.static('build'))
app.use(cors())

morgan.token('content', function (request, response) { return JSON.stringify(request.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())

app.get('/info', async (request, response) => {
    const sum = await Person.countDocuments({})
    response.send(`<p>Phonebook has info for ${sum} people</p><p>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => console.log("error"))
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

//    if (persons.map(p => p.name.toLowerCase()).includes(person.name.toLowerCase())) {
//        return response.status(400).json({
//            error: 'name must be unique'
//        })
//    }

    const personToSave = new Person({
        name: person.name,
        number: person.number
    })

    personToSave.save().then(thisPerson => {
        response.json(thisPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})