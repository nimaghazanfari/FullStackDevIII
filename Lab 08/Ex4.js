process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('Input: ');
process.stdin.on('data', (data) => {
    process.stdout.write(`Output: ${data.toUpperCase()}`);
})