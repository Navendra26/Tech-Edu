const EventEmitter = require('node:events');   // for using commonJs module we need to remove type:module from package.json

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();  // sync =  it bounds the further reading of next line of code
myEmitter.on('event', () => {
  console.log('an event occurred!');
  setTimeout(()=>{
    console.log("event is occured again");
  }, 3000);
});
myEmitter.emit('event');