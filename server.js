const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body


app.get('/',function(req,res){
    res.send('Welcome to our hotel. How I can hel you? We have the List of menus');
});

//Import Router files
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');

//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

const PORT=process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log('Port is running on 3000');
});