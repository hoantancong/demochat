var express = require('express')
var app = express()
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set('views','./views');
var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(3000);
var mangUser = ['abc'];
io.on('connection', function(socket) {
    //console.log('Player connect:'+socket.id)
    socket.on('client-send-Username',function(data) {
        if(mangUser.indexOf(data)>=0){
            //send itself only
            socket.emit('server-send-dki-thatbai')
        }else{
            mangUser.push(data)
            socket.Username = data
            //send itself
            console.log('Emit:'+data)
            socket.emit('server-send-dki-thanhcong',data);
            //send to all other
            io.sockets.emit("server-send-list-Users",mangUser)
        }
    })
    socket.on('logout',function() {
        mangUser.splice(mangUser.indexOf(socket.Username),1)
        socket.broadcast.emit('server-send-list-Users',mangUser)
    })
    //listent chat message
    socket.on('user-send-message',function(data){
        console.log('data'+data)
        io.sockets.emit('server-send-message',{un:socket.Username,nd:data})
    })
    //listen typing
    socket.on('i-am-typing',function(){
        var username = socket.Username +" is typing"
        socket.broadcast.emit('user-are-typing',username)
    })
    //stop typing
    socket.on('i-stop-typing',function(){
        socket.broadcast.emit('user-stop-typing')
    })
})

app.get("/", function(req, res) {
    res.render("trangchu")
})