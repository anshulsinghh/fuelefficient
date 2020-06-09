const morgan = require('morgan')   // Used to monitor GET and POST requests
const mysql = require('mysql2/promise')
const express = require('express') // Used to setup RESTful API routes
const cors = require('cors')
const app = express()

app.use(morgan('short'))
app.use(cors())

app.use(require('./Routes'))

const pool = mysql.createPool({
  host: 'test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com',
  user: 'root',
  password: '***REMOVED***',
  database: 'fuelefficient-data'
})

module.exports = pool

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'))
  })
}

//Start the API on port 4000
app.listen(4000, () => {
  console.log("Server is up and listening on Port 4000.")
})