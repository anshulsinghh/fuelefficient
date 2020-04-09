const express = require('express')
const router = express.Router()

router.get("/model-variations", (req, res) => {
  let year = req.query.year
  let make = req.query.make
  let model = req.query.model

  if (typeof year !== 'string' || typeof make !== 'string' || typeof model !== 'string') {
    res.status(400)
    res.send('Please specify a year, make, and model as string parameters.')
    res.end()
    return
  }
  
  let pool = require('../server.js')
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

module.exports = router