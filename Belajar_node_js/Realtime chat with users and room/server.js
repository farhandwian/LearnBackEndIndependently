const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser,userLeave,getRoomUser}=require('./utils/users')

const app=express();
const server=http.createServer(app)//biar bisa make web socket hrus pake http
const io = socketio(server)

const botName="chatcord bot";

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when client connect
io.on('connection',socket=>{
    //console.log('new WS connection...')
    
    //Eventlistener masukin user ke room 
    socket.on('joinRoom',({username,room})=>{
       /*masukin data user ke db/array  */ const user = userJoin(socket.id,username,room);

       /*Fungsi bawaan socket.io untuk ngebuat room yang isinya socket" */ socket.join(user.room);

    //welcome current user
    socket.emit('message',formatMessage(botName,'welcome to chatcord'));
    
    //Broadcast when a user connects
    socket.broadcast
        .to(user.room)
        .emit('message',formatMessage(botName,'A user has joined the chat'));

    //Send users and room info
    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUser(user.room)
    })

    })
    
    //Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg))
    })

    //Runs when client disconnect
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`A ${user.username} has left the chat`));    
        }
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
