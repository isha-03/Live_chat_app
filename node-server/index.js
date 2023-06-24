const { Socket } = require('socket.io');//socket-io used on 8000 port socket.io server is running and this server will listen incoming events

//npde server which will handle socket io connections
const io=require('socket.io')(8000)
const users={};
//io.on is instance of socket.io it will listen socket connections
io.on('connection',Socket=>{
    //socket.on deals with particular connection
    Socket.on('new-user-joined',name=>{//if new-user-joined event happens name will beappended to users and all the user will get the message
        users[Socket.id]= name;
        Socket.broadcast.emit('user-joined',name);//except the person who joined this event will be emitted to all
    })
    Socket.on('send',message=>{//'send' is a custom name of event
        Socket.broadcast.emit('recieve',{message: message,name: users[Socket.id]});
    })
})