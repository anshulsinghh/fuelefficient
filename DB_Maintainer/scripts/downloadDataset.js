const request = require('request')
const fs = require('fs')

function downloadDataset() {
  return new Promise((resolve, reject) => {
    var fileUrl = "http://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip";
    var output = "download.zip";
    request({url: fileUrl, encoding: null}, function(err, resp, body) {
      if(err) throw err;
      fs.writeFile(output, body, function(err) {
        if (err) {
          reject()
          return
        }
        console.log("done")
        resolve()
      });
    });
  })
}


module.exports = downloadDataset