const express = require('express')
const socket = require('socket.io')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT || 3000 
var server = app.listen(port,()=>{
    console.log("Server is up on ",port);
})

app.use(express.static('public'))

var io = socket(server)

io.on('connection',socket=>{
    console.log("A connection is made by ",socket.id);
    socket.on('chat',(value)=>{
        io.sockets.emit('chat',value)
    })
    socket.on('typing',value=>{
        console.log(value+" is typing");
        socket.broadcast.emit('typing',value)
    })
})
