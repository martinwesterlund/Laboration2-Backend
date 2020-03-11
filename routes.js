const express = require('express')
const router = express.Router()
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'mw',
    password: 'pw',
    database: 'library'
})

connection.connect()


router.get('/', (req, res) => {
    res.send("Welcome to library")
})


//BOOKS

router.route('/books')
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

router.route('/books/:id')
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

    function updateBook(req, res){
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


//AUTHORS
    
    router.route('/authors')
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
    
    router.route('/authors/:id')
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


//MEMBER


        router.route('/members')
        // Get all members
        .get((req, res) => {
            connection.query('SELECT * FROM members', (err, result, fields) => {
                if (err) throw error
                res.json(result)
            })
        })
        // Add one member
        .post((req, res) => {
            let columns = []
            let values = []
            for (let column in req.body) {
                columns.push(column)
                values.push(req.body[column])
            }
    
            let query = mysql.format('INSERT INTO members (??) VALUES (?)', [columns, values])
            connection.query(query, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        })
    
    router.route('/members/:id')
        // Get one member and his/her loande books
        .get((req, res) => {
            let query = `SELECT first_name, last_name, book_name
            FROM books
            JOIN members_books ON books.id = members_books.book_id
            JOIN members ON members.id = members_books.member_id
            WHERE members.id= ${connection.escape(req.params.id)} ORDER BY last_name`
            connection.query(query, (err, result, fields) => {
                if (err) throw err
                res.json(result)
            })
        })
        //Delete one member
        .delete((req, res) => {
            let query = "DELETE FROM members WHERE id =" + connection.escape(req.params.id)
            connection.query(query, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        })
    
        //Update one member
        .put((req, res) => {
            updateMember(req, res)
        })
    
        .patch((req, res) => {
            updateMember(req, res)
        })
    
        function updateMember(req, res){
            let query = 'UPDATE members SET ? WHERE id =' + connection.escape(req.params.id)
            connection.query(query, req.body, (err, result, fields) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(result)
                }
            })
        }

module.exports = router