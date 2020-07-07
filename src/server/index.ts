import express from 'express';
import * as http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

io.on('connection', (socket: any) => {
  socket.on('message', (data: string) => {
    io.emit('message', data);
    console.log('message received', data);
  });
  console.log('user connected');
});

server.listen({ host, port, exclusive: true }, () => {
  console.log(`listening on ${host}:${port}`);
});
