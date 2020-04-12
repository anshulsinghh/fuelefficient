const fs = require('fs')
var csv = require('fast-csv')
const path = require('path')

function uploadData(pool) {
  var activeQueries = 0;
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve('vehicles.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', (row) => {
      if (row.comb08 && row.fuelType != "Electricity") {
        activeQueries++;

        let year = row.year
        let make = row.make
        let model = row.model
        let variation = row.trany
        let mpg = row.comb08
        let identifier = year + make + model + variation

        let sqlQuery = `REPLACE INTO vehicles (year, make, model, variation, mpg, identifier) VALUES(${year}, "${make}", "${model}", "${variation}", ${mpg}, "${identifier}")`

        pool.query(sqlQuery, (err, results, fields) => {
          if (err) {
            reject()
          }
          activeQueries--;

          console.log("Inserted: " + row.year + " " + row.make + " " + row.model + " " + row.trany + " " + row.comb08 + " into the database.")

          if (activeQueries == 0) {
            pool.end()
            resolve()
          }
        })
      }
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
  })
}

module.exports = uploadData