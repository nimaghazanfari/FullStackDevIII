const fs = require('fs');
const extension = process.argv[2];

console.log('Current working Directory:', process.cwd());
console.log('command arg - extension:', extension);

fs.readdir(process.cwd(), (err, files) => {
    files.forEach(file => {

        if (file.endsWith(extension)) console.log(file);

    })
});