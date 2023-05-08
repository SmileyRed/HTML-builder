const path = require('node:path');
const fs = require('node:fs');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

function copyDir(source, target) {
  fs.mkdir(target, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach((file) => {
        const sourcePath = path.join(source, file.name);
        const targetPath = path.join(target, file.name);
        if (file.isDirectory()) {
          copyDir(sourcePath, targetPath);
        } else {
          fs.copyFile(sourcePath, targetPath, (err) => {
            if (err) {
              throw err;
            }
            console.log(`Copied ${sourcePath} to ${targetPath}`);
          });
        }
      });
    });
  });
};

copyDir(sourceDir, targetDir);
