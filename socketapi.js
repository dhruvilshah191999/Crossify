const io = require("socket.io")();
const usersArray = [];

const addUser = ({ id, token, club_id }) => {
  token = token;
  club_id = club_id;

  const existingUser = usersArray.find(
    (user) => user.club_id === club_id && user.token === token
  );

  if (!token || !club_id) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, token, club_id };

  usersArray.push(user);

  return { user };
};
const getUser = (id) => usersArray.find((user) => user.id === id);
const removeUser = (id) => {
  const index = usersArray.findIndex((user) => user.id === id);

  if (index !== -1) return usersArray.splice(index, 1)[0];
};
const socketapi = {
  io: io,
};
io.on("connect", (socket) => {
  console.log("connected with client");
  socket.on("join", ({ token, club_id }, callback) => {
    const { error, user } = addUser({ id: socket.id, token, club_id });
    socket.join(user.club_id);
    console.log("user joined in a room");
  });
  socket.on("sendMessage", (message) => {
    console.log("send message socket received", message);
    const user = getUser(socket.id);
    io.to(user.club_id).emit("Message", message, console.log(message.room_id));
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});
module.exports = socketapi;
