const express = require('express')
const router = express.Router()

router.get("/models", (req, res) => {
  let year = req.query.year
  let make = req.query.make

  if (typeof year !== 'string' || typeof make !== 'string') {
    res.status(400)
    res.send('Please specify a year and make as string parameters.')
    res.end()
    return
  }
  
  let pool = require('../server.js')
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

module.exports = router