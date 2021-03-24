var express = require('express');
var app = express();

app.listen(3000);

app.get('/html', function (req, res) {
    res.send('<html><body><h1>Hello</h1></body></html>');
});

app.get('/json', function (req, res) {
    res.json({ firstname: 'John', lastname: 'Smith' });
});

app.get('/toronto([a-z]{0,})([*+-?]{0,})team', function (req, res) {
    res.send('<html><body><h1>Go Toronto!</h1></body></html>');
});
