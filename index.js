const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const UserList = require('./classes/UserList');
const User = require('./classes/User');
const SystemMessage = require('./classes/SystemMessage');
const Message = require('./classes/Message');

const PORT = process.env.PORT | 4000;
const userList = new UserList();

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }, callback) => {
    const user = new User(socket.id, username, room);
    const error = userList.addUser(user);
    if (error) return callback();

    socket.join(room);
    socket.emit('message', new SystemMessage(`Welcome to the ${room} room.`));
    socket.broadcast
      .to(room)
      .emit('message', new SystemMessage(`${username} joined.`));
  });

  socket.on('sendMessage', (message) => {
    const user = userList.getUser(socket.id);
    if (!user) return;

    const { username, room } = user;
    io.to(room).emit('message', new Message(message, username));
  });

  socket.on('disconnect', () => {
    const user = userList.getUser(socket.id);
    if (!user) return;

    const { username, room, id } = user;
    socket.broadcast
      .to(room)
      .emit('message', new SystemMessage(`${username} left.`));

    userList.removeUser(id);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
