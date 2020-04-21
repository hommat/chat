const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const UserList = require('./UserList');
const User = require('./User');
const SystemMessage = require('./SystemMessage');

const PORT = process.env.PORT | 4000;
const userList = new UserList();

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = new User(socket.id, username, room);
    userList.addUser(user);

    socket.join(room);
    socket.emit('message', new SystemMessage(`Welcome to the ${room} room.`));
    socket.broadcast
      .to(room)
      .emit('message', new SystemMessage(`${username} joined.`));
  });

  socket.on('disconnect', () => {
    const user = userList.getUser(socket.id);
    if (!user) return;

    const { username, room } = user;
    socket.broadcast
      .to(room)
      .emit('message', new SystemMessage(`${username} left.`));
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
