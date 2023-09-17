const express=require('express')
const bcrypt =require('bcryptjs')
const mongoose=require('mongoose')
const morgan=require('morgan');
const app=express();
const cors=require('cors')
require('dotenv').config();
require('./DB/connection')
app.use(morgan('dev'))
app.use(cors());
const port=5000


const user=require('./Routes/userRoutes')
app.use('/api',user)
const theater=require('./Routes/TheaterRoutes')
app.use('/api',theater)

const movies=require('./Routes/MovieRouter')
app.use('/api',movies)

app.listen((port),()=>{
    console.log(`port connetced to ${port}`)
})