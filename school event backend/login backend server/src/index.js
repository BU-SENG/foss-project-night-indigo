const express = require("express")
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect")
const authRoutes = require("./routes/autRoutes")
const  userRoutes = require("./routes/userRoutes")

const app = express();
const PORT = process.env.PORT ||3000;
 

dbConnect();
//Middleware
app.use(express.json());




app.use("/api/auth", authRoutes)
app.use("/api/users",  userRoutes)

app.listen(PORT,()=>{
    console.log(`server  is listening on PORT ${PORT}...`)
})