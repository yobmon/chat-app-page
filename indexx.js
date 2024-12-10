const chatform = require("./chatmethod/textformat");


// importing modules
const express = require("express");
const http = require ("http");
const socketio = require("socket.io");
const {local,getuser,leaveroom,getroom} = require('./chatmethod/usersform');
//creating server with http inside in order to be eay for web sockets
const app = express();
const server=http.createServer(app);

//invoking the web socket and connect it to the server
const io = socketio(server);
//listening connection from the client side
const chatbot ="chat bot";



io.on("connection",  (socket)=>{




socket.on("chatroom",({username,room})=>{
const userid=local(socket.id,username,room);

socket.join(userid.room);


socket.broadcast.to(userid.room).emit("message",chatform(`A ${username} had joined`,`${username}`))
socket.emit("message",chatform("welcome to our group",chatbot));

io.to(userid.room).emit("roomsetup",{
room:userid.room,

user:getroom(userid.room)

})

})

socket.on("chatmessage",(msg)=>{
  const id = getuser(socket.id)
socket.broadcast.to(id.room).emit('message',chatform(msg,id.username))

})

    console.log("its connected");


    socket.on('disconnect', (disconnect)=>{
      const leave = leaveroom(socket.id);

      if (leave){
        io.to(leave.room).emit("message",chatform(`the ${leave.username}had left`,chatbot)) 
      }
      
      console.log(disconnect);
    });
    
}


)

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public');
});


const port =3064;


server.listen(port,()=>{

console.log("listening on port 3064")


})