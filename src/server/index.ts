import express from "express"
import * as http from "http"
import socketio from "socket.io"

const app = express()
const server = http.createServer(app)
const io = socketio(server);
const port = process.env.PORT || 3000

io.on("connection", function(socket: any) {
    socket.on('message', (data: string) => {
        io.emit('message', data)
        console.log('message received')
    });
    console.log('user connected')
});

server.listen(port, function() {
    console.log(`listening on *:${port}`)
})
