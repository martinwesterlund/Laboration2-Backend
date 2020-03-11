const express = require('express')
const resetRouter = express.Router()
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


resetRouter.get('/', resetFees, showIndex)

function resetFees(req, res, next){
    let query = 'CALL reset_fees()'
    connection.query(query, (err, result, fields) => {
        if(err) throw err 
        req.resultat = result
        return next()
    })
}

function showIndex(req, res){
    res.sendFile('index.html', root)
}

module.exports = resetRouter