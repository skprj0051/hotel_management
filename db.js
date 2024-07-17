const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotel_management';

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