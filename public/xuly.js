var socket = io("http://localhost:3000")
socket.on("server-send-dki-thatbai",function(){
    alert("Loi! Username da duoc dang ky");
})
socket.on("server-send-dki-thanhcong",function(data){
    $("#currentUser").html(data)
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})
//listen
socket.on("server-send-list-Users",function(data){
  $("#boxContent").html("")
  data.forEach(function(i) {
    $("#boxContent").append("<div class='user'>"+i+"</div>")
  })
})
//listen message
socket.on("server-send-message",function(jsondata){
    $("#listMessage").append("<div class='ms'>"+jsondata.un+":"+jsondata.nd+"</div>")
})
//listen typing
socket.on("user-are-typing",function(data){
    $("#thongbao").html(data)
})
//listen stop
socket.on("user-stop-typing",function(){
    $("#thongbao").html('')
})
$(document).ready(function() {

    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUserName").val());
    })
    $("#btnLogOut").click(function(){
        socket.emit("logout")
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
    })
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message",$("#textMessage").val());
    })
    $("#textMessage").focusin(function(){
        socket.emit("i-am-typing")
    })
    $("#textMessage").focusout(function(){
        socket.emit("i-stop-typing")
    })
})