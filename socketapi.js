const io = require('socket.io')();
const club_ids = new Map();
const connection = new Map();
const socketIds = new Map();
const onlineUsers = new Map();
const socketapi = {
  io: io,
};
io.on('connect', (socket) => {
  console.log('connected with client');
  socket.on('open', ({ user_id }) => {
    const uid = user_id;
    if (uid != null) {
      socketIds.set(uid, socket.id);
      // if (!onlineUsers.hasOwnProperty(user_id)) {
      //   onlineUsers[user_id] = new Set();
      // }
      // onlineUsers[user_id].add(socket.id);
    }
    console.log('user opened -------------- ', socket.id, user_id);
  });
  socket.on(
    'sendReport',
    ({ date, description, title, report_id, user_id, profile_photo }) => {
      console.log('In send Report client ', user_id);
      io.to(socketIds.get(user_id)).emit(
        'Notify',
        { date, description, title, report_id, profile_photo, user_id },
        console.log(socketIds),
        console.log('Notify emitted to ---------- ', socketIds.get(user_id))
      );
    }
  );
  socket.on('join', ({ user_id, club_id }, callback) => {
    console.log('Adding user : ', socket.id);
    const uid = user_id;
    if (uid != null) {
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
    console.log(currentclub);
    for (var member of currentclub.values()) {
      if (member === connection.get(message.user_id)) continue;
      io.to(member).emit(
        'Message',
        message,
        console.log('message emitted to :', member)
      );
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    connection.delete(socket.id);
    socketIds.delete(socket.id);
  });
});
module.exports = socketapi;
