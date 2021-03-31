const request = require('request');
const fs = require('fs');

request('http://www.google.com').pipe(fs.createWriteStream('output.html'));