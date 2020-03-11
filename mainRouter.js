const express = require('express')
const mainRouter = express.Router()
const mysql = require('mysql')
const loginDetails = require('./loginDetails.js')

let root = {
    root: 'public/'
}

let connection = mysql.createConnection({
    host: 'localhost',
    user: loginDetails.user,
    password: loginDetails.password,
    database: 'library'
})

connection.connect()


mainRouter.get('/', (req, res) => {
    res.sendFile('index.html', root)
})


module.exports = mainRouter