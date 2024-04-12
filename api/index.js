const express = require("express");
const authRoutes = require ("./routes/auth.routes.js")
const todoRoutes = require ("./routes/todo.routes.js")
const userRoutes = require ("./routes/user.routes.js")
const cors = require ("cors");
const cookieParser = require ('cookie-parser');
const mongoose = require("mongoose");
const path = require('path')
require('dotenv').config()

const connection = ()=>{ 
    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err.message)
})
}

connection()

const __dname = path.resolve()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true}))
app.use(cookieParser())




app.use('/api/auth',authRoutes)
app.use('/api/todo',todoRoutes)
app.use('/api/user',userRoutes)

app.use(express.static(path.join(__dname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dname,'client','dist','index.html'))
})

app.listen(3000,()=>{
    console.log("Hello world!")
})

app.use((err,req,res,next)=>{
    const message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

module.exports = app;