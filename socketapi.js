const io = require('socket.io')();
const socketapi = {
  io: io,
};
io.on('connect', (socket) => {
  console.log('connected with client');
  socket.on(
    'sendMessage',
    (message, room_id, user_id, username, profilePic, senttime) => {
      console.log('send message socket received');
      io.to(room_id).emit('Message', {
        message,
        user_id,
        username,
        profilePic,
        senttime,
      });
    }
  );
});
module.exports = socketapi;
