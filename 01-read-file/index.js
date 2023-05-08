const fs = require('node:fs');
const path = require('node:path');

function fileHandler() {
  const filePath = path.join(__dirname, 'text.txt')

  const stream = fs.createReadStream(filePath, 'utf8');
  stream.on('data', (data) => {
    console.log(data);
  });
};

fileHandler();