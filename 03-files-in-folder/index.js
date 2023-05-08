// const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');

const dirPath = path.join(__dirname, 'secret-folder')

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    fs.stat(filePath, function (err, stats) {
      if (err) {
        return console.log('Unable to get file stats: ' + err);
      }
      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        const fileExtension = path.extname(file).substr(1);
        const fileNameWithoutExtension = path.basename(file, `.${fileExtension}`);
        console.log(`${fileNameWithoutExtension} - ${fileExtension} - ${fileSizeInKilobytes.toFixed(2)}kb`);
      }
    });
  });
})