const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('salut', (nom) => {
  console.log(`Bonjour ${nom} !`);
});

emitter.emit('salut', 'Alice');