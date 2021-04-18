const io = require('socket.io')();
const club_ids = new Map();
const connection = new Map();
const socketIds = new Map();
const onlineUsers = new Map();
const socketapi = {
  io: io,
};
io.on('connect', (socket) => {
  socket.on('open', ({ user_id }) => {
    const uid = user_id;
    if (uid != null) {
      socketIds.set(uid, socket.id);
    }
  });
  socket.on(
    'sendReport',
    ({ date, description, title, report_id, user_id, profile_photo }) => {
      io.to(socketIds.get(user_id)).emit(
        'Notify',
        { date, description, title, report_id, profile_photo, user_id },
      );
    }
  );
  socket.on('join', ({ user_id, club_id }, callback) => {
    const uid = user_id;
    if (uid != null) {
      connection.set(uid, socket.id);
      if (!club_ids.hasOwnProperty(club_id)) {
        club_ids[club_id] = new Set();
      }
      club_ids[club_id].add(socket.id);
    }
  });
  socket.on('sendMessage', (message) => {
    const currentclub = club_ids[message.club_id];
    for (var member of currentclub.values()) {
      if (member === connection.get(message.user_id)) continue;
      io.to(member).emit(
        'Message',
        message,
      );
    }
  });
  socket.on('disconnect', () => {
    connection.delete(socket.id);
    socketIds.delete(socket.id);
  });
});
module.exports = socketapi;
