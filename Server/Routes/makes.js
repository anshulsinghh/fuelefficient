const express = require('express')
const router = express.Router()

router.get("/makes", (req, res) => {
  let year = req.query.year

  if (typeof year !== 'string') {
    res.status(400)
    res.send('Please specify a year as a string parameter.')
    res.end()
    return
  }
  
  let pool = require('../server.js')
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

module.exports = router