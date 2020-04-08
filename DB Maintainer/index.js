const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host:'test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com',
  user:'root',
  password:'***REMOVED***',
  database:'fuelefficient-data'
})

let downloadDataset = require('./scripts/downloadDataset.js')
let extractCSV = require('./scripts/extractCSV.js')
let deleteFile = require("./scripts/deleteFile.js")
let uploadData = require("./scripts/uploadData.js")

async function updateDataset() {
  console.log("Downloading datasest from the EPA.")
  await downloadDataset()

  console.log("Finished downloading, now unzipping download to get dataset.")
  await extractCSV()

  console.log("Extracted CSV dataset file, now deleting download zip file.")
  await deleteFile("./download.zip")

  console.log("Parsing the CSV dataset for vehicle data, and uploading to MySQL table.")
  await uploadData(pool)

  console.log("Finished extracting and uploading dataset information to MySQL.")
  await deleteFile("./vehicles.csv")
  
  console.log("Deleted vehicles.csv file.")
  console.log("Finished!")
}

updateDataset()