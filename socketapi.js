const io = require('socket.io')();
const club_ids = new Map();
const connection = new Map();
const socketapi = {
  io: io,
};
io.on('connect', (socket) => {
  console.log('connected with client');

  socket.on('join', ({ token, club_id }, callback) => {
    console.log('Adding user : ', socket.id);
    const uid = token;
    if (token != null) {
      connection.set(uid, socket.id);
      if (!club_ids.hasOwnProperty(club_id)) {
        club_ids[club_id] = new Set();
      }
      club_ids[club_id].add(socket.id);
    }
    console.log('user joined in a room');
  });
  socket.on('sendMessage', (message) => {
    console.log('send message socket received', message);
    const currentclub = club_ids[message.club_id];
    for (var member of currentclub.values()) {
      if (member === connection.get(message.token)) continue;
      io.to(member).emit('Message', message, console.log(message.room_id));
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    connection.delete(socket.id);
  });
});
module.exports = socketapi;
