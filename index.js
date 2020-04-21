const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT | 4000;

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
