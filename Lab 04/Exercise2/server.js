var express = require('express');
var app = express();

app.listen(3000);

var requestTiem = function (req, res, next) {
    req.requestTiem = Date.now();
    next();
}

app.use(requestTiem);

app.get('/greet', function (req, res) {
    console.log('Get Received:', req.requestTiem);
    res.send('Hello World!');
});

app.post('/greet', function (req, res) {
    console.log('Post Received:', req.requestTiem);
    res.send('Hello World!');
});

app.put('/greet', function (req, res) {
    console.log('Put Received:', req.requestTiem);
    res.send('Hello World!');
});

app.delete('/greet', function (req, res) {
    console.log('Delete Received:', req.requestTiem);
    res.send('Hello World!');
});

//GET POST PUT DELETE --> tested on Postman
