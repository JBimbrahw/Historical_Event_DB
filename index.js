//we are using express to create our server

//later we used docker to set up a postgres database and we used TablePlus as the GUI to set up the table

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()
const port = 80

app.use(cors())
app.use(bodyParser())

//defining a get request on the home route
app.get('/', (req, res) => {
    db.Facts.findAll().catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.json(facts)
    })
})

app.post('/', (req, res) => {
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


app.delete('/', (req, res) => {
    db.Facts.findAll().catch(err => {
        console.log(err)
        res.status(500).end()
    }).then( facts => {
        console.log(facts)
        res.json(facts)
    })
})

//after the route definition, listen on the port and then log to let us know the app is ready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//# npm i pg pg-hstore sequelize