const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(express.static(__dirname + '/public'))

server.listen(4000, function(){
  console.log('server listening on port', 4000)
})

const Serialport = require("serialport");
const Readline = Serialport.parsers.Readline;

const port = new Serialport("COM3", {
  baudRate: 9600
});

const parser = port.pipe(new Readline());

parser.on('open', function(){
  console.log('connection is opened');
});

parser.on('data', function(data){
  data = data.split(",")
  data = data.map((e)=>{
    return parseFloat(e)
  })
  console.log(data)
  io.emit('datos', data)
  
 
});

port.on('error', function(err){
  console.log(err)
})