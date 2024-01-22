

const express = require('express')
const server = express()
const mongoose= require("mongoose")
const users = require("./src/Models/users")
const http = require("http")
const { Server} = require("socket.io")

const app = http.createServer(server)
const { register, login, findUser } = require("./src/Controllers/authentication")
const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require('./src/Middlewares')
const { addForm } = require('./src/Controllers/Form')
const { sendEmail } = require('./src/Helpers/Emails')
const io = new Server(app)
server.use(express.json())
server.use(cors())

// dotenv
require('dotenv').config()

server.post("/register",register,sendEmail)
server.post("/login",login)
server.get("/get-user",verifyToken,findUser)
server.post("/add-form",validateForm,isValidated,addForm,sendEmail)





server.get('/', function (req, res) {
  res.send('Hello World')
})

io.on("connection", socket =>{
  console.log("new user connected");
  socket.on("message",(message,room) =>{
    console.log(`New message recieved in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
  })
  socket.on("join",(room)=>{
    console.log(room);
    socket.join(room)
    socket.emit("joined")
  })
})



app.listen(3000)
// app.listen(process.env.PORT, function(){
//   console.log(`Concted to Port  ` )
// })




mongoose.connect("mongodb://localhost:27017/test").then(()=>
console.log("Db connected")
).catch((error)=>{
    console.log(error.messager)
})
