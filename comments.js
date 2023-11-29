//create web server
var express = require('express');
var app = express();
//use the express middleware for serving static files
app.use(express.static(__dirname));
//start the web server on port 3000
app.listen(3000);
console.log('Listening on port 3000');
//create socket server
var io = require('socket.io').listen(3001);
//handle incoming connections from clients
io.sockets.on('connection', function (socket) {
  //once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    socket.join(room);
  });
  // when the server receives a ping from the client, send them the
  // current time
  socket.on('ping', function () {
    socket.emit('pong', { time: new Date().toJSON() });
  });
  // when the server receives a comment, it sends it to the other person in the room.
  socket.on('comment', function (data) {
    socket.broadcast.to(data.room).emit('comment', data);
  });
});