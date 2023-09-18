const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()



// add middleware 
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(errorHandler)

// getting routes for api from router
app.use('/test/goals',require('./routes/testRoute'))

app.listen(port, () => console.log(`Server started on port ${port}`))