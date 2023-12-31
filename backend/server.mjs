import express from "express";
import http from "http";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, allUser} from "./utils/users.mjs";

import authenticate from "./authenticate.mjs";

let datas, roomIdGlobal, imgUrlGlobal;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 5000;


io.on("connection", (socket) => {

  socket.on("userJoined", (data) => {

    let {userName,roomName,roomId,host} = data;

    if(host == false){

      const userList = allUser();

      for(let i = 0; i < userList.length; i++){
        if(userList[i].roomId == roomId && userList[i].host){
          roomName = userList[i].roomName;
        }
      }

    }

    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({userName, roomName, roomId, host, socketId: socket.id});
    console.log(users);
    socket.emit("userHasJoined", { success: true, users, user: {userName, roomName, roomId, host, socketId: socket.id}});
    socket.broadcast.to(roomId).emit("userJoinedMsg", userName);
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteboardDataRes", {
      imgUrl: imgUrlGlobal,
    });

  });

  socket.on("whiteboardData", (data) => {
    imgUrlGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataRes", {
      imgUrl: data,
    })
  }); 

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if(user){
      removeUser(socket.id);
      socket.broadcast.to(roomIdGlobal).emit("userLeftMsg",user.userName);
    }
  });

  socket.on("message", (data) => {
    const {msg} = data;
    const user = getUser(socket.id);
    if(user){
      socket.broadcast.to(roomIdGlobal).emit("messageRes", {msg, name: user.userName});
    }
    
  })

});


app.set("view engine", "ejs");

app.get("/main",authenticate, (req, res) => {

  const temp = req.user_name;

  datas = {
    user_name: temp,
  };

  res.render("main", datas);
});

app.post("/getUsername", (req, res) => {
  res.json({datas});
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
