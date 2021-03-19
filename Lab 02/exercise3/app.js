var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('call', () => { console.log('call me...') });
eventEmitter.emit('call');

eventEmitter
    .on('important-alarm', (e) => {
        console.log(`Alarm "${e.data}" has been triggered!`);
        eventEmitter.emit('second-alarm', '200 OK');
    })
    .on('second-alarm', (data) => {
        console.log(`Call 911 + "${data}"`)
    });

eventEmitter.emit('important-alarm', { data: 'Alarm-1' });