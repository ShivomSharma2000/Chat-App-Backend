import express from "express"
import { Server } from "socket.io";
import {createServer} from 'http'

const PORT= 3000;
const app = express();
const server= createServer(app);
const io= new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send("HELLO WORLD")
})

//For authentication
io.use((socket, next) => {
    next()
})

//'connection' is the pre-built method it run's when you socket is connected with front-end.
io.on('connection', (socket) => {
    console.log("User connected", socket.id);
    socket.emit("welcome", `Welcome to socket world, your socket id is: ${socket.id}`);

    //listen message which emit from front-end
    socket.on("message", ({room, message})=> {
        console.log("message: ", {room, message});
        //For particular user we have to use io.to(room).emit() method.
        io.to(room).emit("receive-message", message);

        //Broadcast using when we want to send message to all the users except itself.
        // socket.broadcast.emit("receive-message", data);
    })

    //for join the room
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log("User joined room: ", room)
    })

    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id);
    })
})

server.listen(PORT, ()=> { 
    console.log(`Server is running on Port ${PORT}`)
})
