const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {connectDB} =  require('./config/db')

const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const app = express()



// add middleware 
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(errorHandler)

// getting routes for api from router
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))