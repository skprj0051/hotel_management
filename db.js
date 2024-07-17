const mongoose=require('mongoose');
require('dotenv').config();

//const mongoURL=process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL;

//set up mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//Get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db=mongoose.connection;

//define event Listner for database connection
db.on('error',(err)=>{
    console.error('MongoDB connection error :',err);
});
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//export database connection
module.exports=db;