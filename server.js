const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 7000

app.use(express.static(__dirname+'/public'))
var NumofActUsr = []
var activeUsers = []

http.listen(PORT,()=>{

    console.log(`Listening on Port: ${PORT}`)
})

// Basic  Route

app.get('/',(req,res)=>{

 
 
   res.sendFile(__dirname+'/index.html')


})


app.get('/chat',(req,res)=>{

 res.sendFile(__dirname+'/rooms.html')

})



// Socket



io.on('connection',(socket)=>{

  
    socket.on("user_connected",function(username){
        activeUsers[username] = socket.id 
        console.log(username)
        // notify all the Clients
        io.emit("user_connected",username)
        

    })

    socket.on("send_message",function(data){
        
        var socketid = activeUsers[data.reciever]
        io.to(socketid).emit("new_message",data)
    })


    socket.on('disconnect', function (socket) {

        
    });
})












