const path = require('node:path');
const fs = require('node:fs');

const dirPath = path.join(__dirname, 'styles');
const targetPath = path.join(__dirname, 'project-dist', 'bundle.css');

function mergeStyles(dirPath, targetPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      throw err;
    }
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    if (cssFiles.length === 0) {
      console.log('No CSS files found in the directory');
      return;
    }
    const writeStream = fs.createWriteStream(targetPath);
    cssFiles.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(writeStream, { end: false });
      readStream.on('end', () => {
        writeStream.write('\n');
        console.log(`File ${file} has been merged`);
      });
    });
    writeStream.on('finish', () => {
      console.log(`All files have been merged into ${targetPath}`);
    });
  });
}

mergeStyles(dirPath, targetPath);