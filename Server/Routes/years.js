const express = require('express')
const router = express.Router()

router.get("/years", (req, res) => {
  let pool = require('../server.js')
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

module.exports = router