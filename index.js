const express = require('express')
const socket = require('socket.io')
const app = express()
var server = app.listen(4000,()=>{
    console.log("Server is up");
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
