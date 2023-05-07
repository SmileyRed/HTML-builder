const fs = require('node:fs');
const process = require('node:process');
const path = require('node:path');


process.on('exit', () => {
  console.log('Уходите! Я вас не звал!');
});

process.on('SIGINT', () => {
  process.exit();
});

const filePath = path.join(__dirname, 'text.txt')

fs.open(filePath, 'w', (err) => {
  if (err) throw err;
  console.log('Введите текст');

});

const readable = process.stdin;
readable.setEncoding('utf8');
readable.on('data', (data) => {
  if (data.trim() === 'exit') {
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
  });
})

