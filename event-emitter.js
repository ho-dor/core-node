const EventEmitter = require('events');

const myEvents = new EventEmitter();

myEvents.on('foo', () => {
    console.log("Someone is saying foo");
});

myEvents.emit('foo')