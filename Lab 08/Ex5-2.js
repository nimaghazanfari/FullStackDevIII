const { fork } = require('child_process');

const longComp = () => {
    let sum = 0;

    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }

    return sum;
}

const parent = fork('Ex5-1.js');

process.on('message', message => {
    const result = longComp();
    parent.send(result);
    process.exit(0);
});