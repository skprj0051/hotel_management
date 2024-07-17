const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/menuItem');


//Post method for menu
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('Menu Data Saved Successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

//Get method for menu 
router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

//Parameterized API call
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=="sweet" || tasteType=="sour" || tasteType=="spicy"){
            const response=await MenuItem.find({taste:tasteType});
            console.log('menuItem response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invailid WorkType'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

//Update menuItem 
router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;//Extract the menuItems's id from the URL parameter
        const updateMenuData=req.body;//updated data for menuItem
        const response=await MenuItem.findByIdAndUpdate(menuId,updateMenuData,{
            new:true,//return the updated document
            runValidators:true//Run mongoose validation
        });
        if(!response){
            return res.status(404).json({error:'Invailid Menu found'});
        }
        console.log("Menu data updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
});

//Delete menu Item
router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;//Extract the MenuItem's id from URL
        const response=await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'Invailid menu Item'});
        }
        console.log("MenuItem Deleted Successfully");
        res.status(200).json({message:'MenuItem deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'});
    }
})
module.exports=router;

//Just adding comments