const morgan = require('morgan')   // Used to monitor GET and POST requests
const mysql = require('mysql2/promise')
const express = require('express') // Used to setup RESTful API routes
const app = express()

app.use(morgan('short'))

app.use(require('./Routes'))

const pool = mysql.createPool({
  host:'test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com',
  user:'root',
  password:'***REMOVED***',
  database:'fuelefficient-data'
})

module.exports = pool

//Start the API on port 4000
app.listen(4000, () => {
  console.log("Server is up and listening on Port 4000.")
})