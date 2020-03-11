const express = require('express')
const bookRouter = express.Router()
const mysql = require('mysql')
const loginDetails = require('./loginDetails.js')

let connection = mysql.createConnection({
    host: 'localhost',
    user: loginDetails.user,
    password: loginDetails.password,
    database: 'library'
})

connection.connect()

bookRouter.route('/')
    // Get all books and their authors
    .get((req, res) => {
        connection.query(`SELECT book_name AS "Book title", CONCAT(first_name, ' ', last_name) AS Author
        FROM books
        JOIN author_books ON books.id = author_books.book_id
        JOIN authors ON authors.id = author_books.author_id
        WHERE 1 ORDER BY book_name`, (err, result, fields) => {
            if (err) throw error
            res.json(result)
        })
    })
    // Add one book
    .post((req, res) => {
        let columns = []
        let values = []
        for (let column in req.body) {
            columns.push(column)
            values.push(req.body[column])
        }

        let query = mysql.format('INSERT INTO books (??) VALUES (?)', [columns, values])
        connection.query(query, (err, result, fields) => {
            if (err) {
                throw err
            }
            else {
                res.json(result)
            }
        })
    })

bookRouter.route('/:id')
    // Get one book and its author(s)
    .get((req, res) => {
        let query = `SELECT book_name AS "Book title", CONCAT(first_name, ' ', last_name) AS Author
        FROM books
        JOIN author_books ON books.id = author_books.book_id
        JOIN authors ON authors.id = author_books.author_id
        WHERE books.id=` + connection.escape(req.params.id)
        connection.query(query, (err, result, fields) => {
            if (err) throw err
            res.json(result)
        })
    })
    //Delete one book
    .delete((req, res) => {
        let query = "DELETE FROM books WHERE id =" + connection.escape(req.params.id)
        connection.query(query, (err, result, fields) => {
            if (err) {
                throw err
            }
            else {
                res.json(result)
            }
        })
    })

    //Update one book
    .put((req, res) => {
        updateBook(req, res)
    })

    .patch((req, res) => {
        updateBook(req, res)
    })

function updateBook(req, res) {
    let query = 'UPDATE books SET ? WHERE id =' + connection.escape(req.params.id)
    connection.query(query, req.body, (err, result, fields) => {
        if (err) {
            throw err
        }
        else {
            res.json(result)
        }
    })
}


module.exports = bookRouter