const unzip = require('unzip')
const fs = require('fs')

function extractCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./download.zip")
      .pipe(unzip.Parse())
      .on('entry', function (entry) {
        var fileName = entry.path;
        if (fileName === "vehicles.csv") {
          entry.pipe(fs.createWriteStream('./vehicles.csv'));
          resolve()
        } else {
          entry.autodrain();
        }
      });
  })
}

module.exports = extractCSV