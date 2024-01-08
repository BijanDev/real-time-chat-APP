const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log("user connected:", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log("User With id:", socket.id, "Join the room:", room);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recived_message", data);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });
})

server.listen(3050, () => {
    console.log("Server is running on PORT 3050");
});