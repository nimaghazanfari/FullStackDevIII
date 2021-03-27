const express = require('express');
const app = express();

/* GET home page. */
app.get('/', function (req, res, next) {
    res.sendFile('index.html', { root: app.get('views') })
});

module.exports = app;
