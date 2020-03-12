const express = require('express')
const memberRouter = express.Router()
const mysql = require('mysql')
const loginDetails = require('./loginDetails.js')

let connection = mysql.createConnection({
    host: 'localhost',
    user: loginDetails.user,
    password: loginDetails.password,
    database: 'library'
})

connection.connect()

memberRouter.route('/')
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
    
    memberRouter.route('/:id')
        // Get one member and his/her loaned books
        .get((req, res) => {
            let query = 
            `SELECT first_name AS "First name", last_name AS "Last name", book_name AS "Borrowed book", late_fees AS "Late fees"
            FROM members
            LEFT JOIN members_books ON members.id = members_books.member_id
            LEFT JOIN books ON books.id = members_books.book_id
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
module.exports = memberRouter