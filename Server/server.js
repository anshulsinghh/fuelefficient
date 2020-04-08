const morgan = require('morgan')   // Used to monitor GET and POST requests
const mysql = require('mysql2/promise')
const express = require('express') // Used to setup RESTful API routes
const app = express()

app.use(morgan('short'))

const pool = mysql.createPool({
  host:'test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com',
  user:'root',
  password:'***REMOVED***',
  database:'fuelefficient-data'
})

//Start the API on port 3000
app.listen(3000, () => {
  console.log("Server is up and listening on Port 3000.")
})

app.get("/", (req, res) => {
  res.send("Hello World.")
})

app.get("/api/v1.0/years", (req, res) => {

})

app.get("/api/v1.0/makes/:year", (req, res) => {

})

app.get("/api/v1.0/models/:year/:make", (req, res) => {

})

app.get("/api/v1.0/model-variations", (req, res) => {
  let year = req.query.year
  let make = req.query.make
  let model = req.query.model

  if (year === undefined || make == undefined || model == undefined) {
    res.status(400)
    res.send('Please specify a year, make, and model as parameters.')
    res.end()
    return
  }

  if (typeof year !== 'string' || typeof make !== 'string' || typeof model !== 'string') {
    console.log(typeof year)
    res.status(400)
    res.send('Please format the year, make, and model parameters as strings.')
    res.end()
    return
  }
  
  let query = `SELECT variation, epa_id FROM vehicles WHERE year=${year} AND make=${make} AND model=${model}`
  pool.query(query, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    res.json(results)
  })
})

app.get("/api/v1.0/data/:vehicleid", (req, res) => {

})