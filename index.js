const express = require('express')
const app = express()
const mainRouter = require('./mainRouter.js')
const bookRouter = require('./bookRouter.js')
const authorRouter = require('./authorRouter.js')
const memberRouter = require('./memberRouter.js')
const resetRouter = require('./resetRouter.js')


app.use(express.json())


// app.use('/', router)
app.use('/', mainRouter)
app.use('/books', bookRouter)
app.use('/authors', authorRouter)
app.use('/members', memberRouter)
app.use('/reset', resetRouter)

app.listen(8080, () => {
    console.log('Server started at 8080')
})