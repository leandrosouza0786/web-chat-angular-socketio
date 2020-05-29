const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

io.set('origins', '*:*');

io.on('connection', (socket) =>{
    socket.on('message', (msg) =>{
        console.log(msg)
        io.emit('message', msg);
    })

    let sub = setInterval(() => {
        io.to(socket.id).emit('message', {
            from: 'server',
            message: 'Hello from server!' 
        })
    }, 2000);

    socket.on('disconnect', () => {
        clearInterval(sub);
    })
})

http.listen(4444, () =>{
    console.log('Listening  on port 4444')
})