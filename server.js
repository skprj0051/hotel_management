const express=require('express');
const app=express();
const db=require('./db');

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


app.listen(3000,()=>{
    console.log('Port is running on 3000');
});