const fs = require('fs');
const path = require('path');
const pathForDir = path.join(__dirname, 'files-copy');
const pathFromDir = path.join(__dirname, 'files');

function copyDir() {

  fs.rmdir(pathForDir, { recursive: true, force: true }, (err) => {
    fs.mkdir(pathForDir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
      else {
        createFiles();
      }
    })
  })

  const createFiles = () => {
    fs.readdir(pathFromDir, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          fs.copyFile(pathFromDir + '/' + file, pathForDir + '/' + file, (err) => {
            if (err) {
              console.log('error');
            }
          });
        })
      }
    })
  }
}

copyDir();

