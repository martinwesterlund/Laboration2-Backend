const express = require('express')
const authorRouter = express.Router()
const mysql = require('mysql')
const loginDetails = require('./loginDetails.js')

let connection = mysql.createConnection({
    host: 'localhost',
    user: loginDetails.user,
    password: loginDetails.password,
    database: 'library'
})

connection.connect()

authorRouter.route('/')
        // Get all authors
        .get((req, res) => {
            connection.query('SELECT * FROM authors', (err, result, fields) => {
                if (err) throw error
                res.json(result)
            })
        })
        // Add one author
        .post((req, res) => {
            let columns = []
            let values = []
            for (let column in req.body) {
                columns.push(column)
                values.push(req.body[column])
            }
    
            let query = mysql.format('INSERT INTO authors (??) VALUES (?)', [columns, values])
            connection.query(query, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        })
    
    authorRouter.route('/:id')
        // Get one author and his/her books
        .get((req, res) => {
            let query = `SELECT first_name AS "First name", last_name AS "Last name", book_name AS "Book title"
            FROM books
            JOIN author_books ON books.id = author_books.book_id
            JOIN authors ON authors.id = author_books.author_id
            WHERE authors.id=` + connection.escape(req.params.id)
            connection.query(query, (err, result, fields) => {
                if (err) throw err
                res.json(result)
            })
        })
        //Delete one author
        .delete((req, res) => {
            let query = "DELETE FROM authors WHERE id =" + connection.escape(req.params.id)
            connection.query(query, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        })
    
        //Update one author
        .put((req, res) => {
            updateAuthor(req, res)
        })
    
        .patch((req, res) => {
            updateAuthor(req, res)
        })
    
        function updateAuthor(req, res){
            let query = 'UPDATE authors SET ? WHERE id =' + connection.escape(req.params.id)
            connection.query(query, req.body, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        }



module.exports = authorRouter