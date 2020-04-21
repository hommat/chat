const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

const UserList = require('./classes/UserList');
const User = require('./classes/User');
const SystemMessage = require('./classes/SystemMessage');
const Message = require('./classes/Message');

const PORT = process.env.PORT | 4000;
const userList = new UserList();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/enter', (req, res) => {
  const { username, room } = req.body;
  const errors = {};
  if (!username) errors.username = 'Username is required';
  if (!room) errors.room = 'Room is required';

  if (Object.keys(errors).length === 0) {
    if (userList.isUsernameAlreadyInRoom(username, room)) {
      errors.room = 'Username is already used in this room';
      return res.status(400).json(errors);
    }

    return res.json({});
  } else return res.status(400).json(errors);
});

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }, callback) => {
    const user = new User(socket.id, username, room);
    if (userList.isUsernameAlreadyInRoom(username, room)) return callback();

    userList.addUser(user);
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
