const http = require('http');
const url = require('url');
const emitter = require('events').EventEmitter;

var em = new emitter();

em.on('jackpot', () => {
    console.log('Jackpot!!!');
})

const hostname = '127.0.0.1';
const port = 3000;
var amount = 0;

const server = http.createServer((req, res) => {

    var callerUrl = url.parse(req.url, true);

    if (callerUrl.pathname.includes('favicon')) return;

    switch (callerUrl.pathname) {
        case '/spin':
            console.log('Spinning...');
            console.log('amount lost:', amount);
            amount = '0';
            break;
        case '/play':
            amount = callerUrl.query.amount;
            console.log('Palying... amount:', amount);
            if (amount == 'max') em.emit('jackpot');
            break;
        default:
            console.log('Please play or spin');
            break;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});