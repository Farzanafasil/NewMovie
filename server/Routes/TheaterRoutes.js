const express=require('express');
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))

const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const theaterData=require('../model/Theater')


//addTheater

router.post('/theater', async(req,res)=>{
    try {
        const {email,password}=req.body;
       
        const existinguser= await theaterData.findOne({email:email})
        if(existinguser)
        {
            return res.status(400).json({message:"User Already Exist"})
        }
        else
        {
            const theater=await theaterData({email,password})
            theater.save()
            res.send(theater);
            return res.status(200).json({message:"created Succesfully",})
        }

        
    } catch (error) {

        return console.log(error);

    }
})

//get theaters


router.get('/theater',async(req,res)=>{

   let theaters;

   try {

    theaters=await theaterData.find();

    if(!theaters)
    {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ theaters });
    // res.send(theaters)
    
   } catch (error) {
    console.log(error)
   }


})

//getTheaters by id



router.get('/theater/:id',async(req,res)=>{

    const id = req.params.id;
  
    let TheaterAdmin;
    try {
      TheaterAdmin = await theaterData.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!TheaterAdmin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ TheaterAdmin});
  
})




//Login Theater Admin



router.post('/theaterlogin',async(req,res)=>{
    

//   let email = req.body.email;
//   let password = req.body.password;


   const {email,password}=req.body
  console.log('password+++++++++')
  console.log(password)
  console.log(email)
  const TheaterAdmin = await theaterData.findOne({email});
  console.log(TheaterAdmin)
     if(!TheaterAdmin)
     {
        return res.status(400).json({ message: "Admin not found" })
     }
     try {
       

        if(TheaterAdmin.password==password)
        {
            jwt.sign({email:email,id:TheaterAdmin._id},"Movie",{expiresIn:'1d'},(error,token)=>{
                

                if(error)
                {
                    res.json({message:"Token not Generated"})
                }
                else
                {
                    return res.status(200).json({message:"Login success",token:token,theater:TheaterAdmin})

                }
            })
      
        }
    
  } catch (error) {
    console.log(error)
    
  }


})
module.exports=router;
