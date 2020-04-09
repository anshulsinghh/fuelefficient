const express = require('express')
const router = express.Router()

router.get("/fuel-data", (req, res) => {
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

  let pool = require('../server.js')
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

module.exports = router