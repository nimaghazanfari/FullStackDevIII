const eventEmitter = require('events');

const emitter = new eventEmitter();

emitter.on('convert', (buff) => {
    for (let v of buff) {
        console.log(v.toString());
    }

    console.log('buffer converted');
})

emitter.emit('convert', Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]));
