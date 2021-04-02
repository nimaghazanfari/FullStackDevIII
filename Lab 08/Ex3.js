process.on('SIGINT', code => {
    console.log('process uptime on signal interrupt:', process.uptime());
    process.exit(0);
});

process.on('exit', () => {
    console.log('process uptime on exit:', process.uptime());
    process.exit(0);
})

setInterval(() => null, 1000);
