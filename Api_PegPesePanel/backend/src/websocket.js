const socketio = require('socket.io');

exports.setupWebsocket = (server)  => {
  const io = socketio(server);

  io.on('connection', function (socket) {
    io.emit('this', { will: 'be received by everyone'});

    socket.emit('news');

    socket.on('my other event', function (data) {
      console.log(data);
    });

    socket.on('new-delivery', data => {
      socket.broadcast.emit('new', data);
    });

    socket.on('remove', data => {
      console.log(data)
      socket.broadcast.emit('delete', data);
    });

    socket.on('disconnect', function () {
      io.emit('user disconnected');
    });

  })
};