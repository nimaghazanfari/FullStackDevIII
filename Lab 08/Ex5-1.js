const { fork } = require('child_process');

const child = fork('Ex5-2.js', ['normal']);
child.send('message');

process.on('message', result => {
    console.log('Long Computation Result:', result);
    process.exit(0);
})