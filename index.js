

const express = require('express')
const app = express()
const mongoose= require("mongoose")
const users = require("./src/Models/users")
const { register, login, findUser } = require("./src/Controllers/authentication")
const cors = require("cors")
const { verifyToken } = require('./src/Middlewares')
app.use(express.json())
app.use(cors())

// dotenv
require('dotenv').config()

app.post("/register",register)
app.post("/login",login)
app.get("/get-user",verifyToken,findUser)




app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, function(){
  console.log(`Concted to Port  ` )
})




mongoose.connect(process.env.MONGO_URL).then(()=>
console.log("Db connected")
).catch((error)=>{
    console.log(error.messager)
})
