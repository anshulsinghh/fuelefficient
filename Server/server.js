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

app.get("/api/v1.0/years", (req, res) => {
  let sqlQuery = `SELECT DISTINCT year FROM vehicles`
  pool.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    let output = []
    for (var i = 0; i < results.length; i++) {
      output.push(results[i].year)
    }

    res.json(output)
  })
})

app.get("/api/v1.0/makes", (req, res) => {
  let year = req.query.year

  if (typeof year !== 'string') {
    res.status(400)
    res.send('Please specify a year as a string parameter.')
    res.end()
    return
  }
  
  let sqlQuery = `SELECT DISTINCT make FROM vehicles WHERE year=${year}`
  pool.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    let output = []
    for (var i = 0; i < results.length; i++) {
      output.push(results[i].make)
    }

    res.json(output)
  })
})

app.get("/api/v1.0/models", (req, res) => {
  let year = req.query.year
  let make = req.query.make

  if (typeof year !== 'string' || typeof make !== 'string') {
    res.status(400)
    res.send('Please specify a year and make as string parameters.')
    res.end()
    return
  }
  
  let sqlQuery = `SELECT DISTINCT model FROM vehicles WHERE year=${year} AND make=${make}`
  pool.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    let output = []
    for (var i = 0; i < results.length; i++) {
      output.push(results[i].model)
    }

    res.json(output)
  })
})

app.get("/api/v1.0/model-variations", (req, res) => {
  let year = req.query.year
  let make = req.query.make
  let model = req.query.model

  if (typeof year !== 'string' || typeof make !== 'string' || typeof model !== 'string') {
    res.status(400)
    res.send('Please specify a year, make, and model as string parameters.')
    res.end()
    return
  }
  
  let sqlQuery = `SELECT variation FROM vehicles WHERE year=${year} AND make=${make} AND model=${model}`
  pool.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    let output = []
    for (var i = 0; i < results.length; i++) {
      output.push(results[i].variation)
    }

    res.json(output)
  })
})

app.get("/api/v1.0/mpg", (req, res) => {
  let year = req.query.year
  let make = req.query.make
  let model = req.query.model
  let variation = req.query.variation

  if (typeof year !== 'string' || typeof make !== 'string' || typeof model !== 'string' || typeof variation !== 'string') {
    res.status(400)
    res.send('Please specify a year, make, model, and variation as string parameters.')
    res.end()
    return
  }
  
  let sqlQuery = `SELECT * FROM vehicles WHERE year=${year} AND make=${make} AND model=${model} AND variation=${variation}`
  pool.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500)
      res.send("SQL query failed.")
      res.end()
      return
    }

    let output = []
    for (var i = 0; i < results.length; i++) {
      output.push(results[i].mpg)
    }

    res.json(output)
  })
})