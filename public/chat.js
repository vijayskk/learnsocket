var socket = io.connect('http://localhost:4000/')

var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')

var output = document.getElementById('output')
var feedback = document.getElementById('feedback')

btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
    socket.emit('typing',"")
})

socket.on('chat',(value)=>{
    console.log(value);
    output.innerHTML += "<p><strong>"+ value.handle +":</strong>"+value.message
}) 

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value+" is typing...")
})

socket.on('typing',value=>{
    feedback.innerHTML = "<p>"+ value +"</p>"
})