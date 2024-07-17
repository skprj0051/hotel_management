const express=require('express');
const router=express.Router();
const Person=require('./../models/person');


//Post method for person
router.post('/',async(req,res)=>{
    try{
        const data=req.body;//Assuming the request body contains the person data

        //create a new person document using the mongoose model
        const newPerson=new Person(data);

        //save the new person to the database
        const response=await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

});

//get method to get person
router.get('/',async(req,res)=>{
    try{
        //use mongoose model to fetch all persons from database
        const data=await Person.find();
        console.log('Data Fetched');

        //send list of person as JSON response
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

//Parameterized API call

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;//Extract the work type from the URL parameter
        if(workType=="chef" || workType=="waiter" || workType=="manager"){
            const response=await Person.find({work:workType});
            console.log("Response Fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invailid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
});

//Update Person document

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//Extract the id from the URL parameter
        const updatePersonData=req.body;//Updated data for the person
        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,//Return the updated document
            runvalidators:true//Run Mongoose validation
        });
        if(!response){
            return res.status(404).json({error:'Person is not found'});
        }
        console.log("PersonData Updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
});


// Delete method
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//Extract person's id from the URL parameter
        //Assumming you have the person model
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:'Person not found'})
        }
        console.log('person data deleted successfully');
        res.status(200).json({message:'Person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'});
    }
});
module.exports=router;