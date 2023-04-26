//we are using express to create our server
//we use docker to set up a postgres database and we used TablePlus as the GUI to set up the table

//This code defines a number of routes:
//a get for each of the 3 web pages
//a get to fetch all the facts from the database
//a post to send a new fact to the db (create a new record)
//a delete to delete a record - this is the only request that sends a parameter
//we also have to specify on what port the app is listening -
//that establishes the channel that serves as an input to our server

//server
const express = require('express')
require('dotenv').config()

//cross origin request...attaching this to our middleware to allow requests coming in from different ports
const cors = require('cors')

//so we can accept and read JSON easier...helps us to fetch all the facts
const bodyParser = require('body-parser')

//we are using db.js for our db connection
const db = require('./db')
const app = express()
const port = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser())
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/viewdata', (req, res) => {
    db.Facts.findAll({
        order: [
            ['date', 'ASC'],
            ['fact', 'ASC']
        ]
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.render('viewdata', {
            "facts" : facts
        })
    })
})

app.get('/deletedata', (req, res) => {
    db.Facts.findAll({
        order: [
            ['date', 'ASC'],
            ['fact', 'ASC']
        ]
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.render('deletedata', {
            "facts" : facts
        })
    })
})

app.get('/quiz', (req, res) => {
    db.Facts.findAll({
        order: [
            ['date', 'ASC'],
            ['fact', 'ASC']
        ]
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.render('quiz', {
            "facts" : facts
        })
    })
})


app.get('/api', (req, res) => {
    db.Facts.findAll({
        order: [
            ['date', 'ASC'],
            ['fact', 'ASC']
        ]
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.json(facts)
    })
})

app.post('/api', (req, res) => {
    console.log(req.body)
    db.Facts.create({fact: req.body.eventdata, date: req.body.year})
        .catch(err =>{
            console.log(err)
            res.json({success: false})
        })
        .then((result, metaData) => { 
            console.log(result, metaData)
            res.json({success: true})
        })
})

app.delete('/api/:id', (req, res) => {
    const id = req.params.id
    db.Facts.destroy({
        where: { "id": id }
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( result => {
        console.log(result)
        res.json({status: true})
    })
})

//after the route definition, listen on the port and then log to let us know the app is ready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

console.log(process.env)

//# npm i pg pg-hstore sequelize
