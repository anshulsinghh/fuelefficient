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

    let output = [results[0].mpg]

    let out = {"mpg": results[0].mpg,
               "100 miles": getData(100, results[0].mpg),
               "15000 miles": getData(15000, results[0].mpg),
               "150000 miles": getData(150000, results[0].mpg)
              }
    res.json(out)
  })
})

function getData(miles, mpg) {
  gallons_used = miles/mpg
  co2_emitted = gallons_used * 19.64

  return {"CO2 emitted": co2_emitted.toFixed(2),
          "Household": (co2_emitted/1250).toFixed(2),
          "Tree": (co2_emitted/2000).toFixed(2),
          "Flights from SD to PHX": (co2_emitted/15829.51).toFixed(2)}
}

module.exports = router