const fs = require('fs')

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, function(error) {
      if (error) {
          reject()
      }
      resolve()
    })
  })
}

module.exports = deleteFile