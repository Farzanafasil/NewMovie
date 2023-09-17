const express=require('express')
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')

const movieData=require('../model/Movies')




//add Movies
router.post('/movies',async(req,res)=>{
    let movie;
    let TheaterAdmin;
   
try {
 const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
 jwt.verify(req.body.token,"Movie",(error,decoded)=>{
if(decoded&&decoded.email)

 {
    
 let movie;
 TheaterAdmin=decoded.id;

 
   

   
 movie = new movieData({description, releaseDate: new Date(`${releaseDate}`), featured,actors,theater:TheaterAdmin,posterUrl,title, });

 movie.save();
 return res.status(200).json({message:"Movie Added"})
                
              
 }
 else{
    res.json({message:"Unauthorized User"})
 }
             
 })
        
} catch (error) {
    console.log(error)
        
    }
})





router.get('/movies', async(req,res)=>{
    try {

        const movies= await movieData.find();


        if (!movies) {
            return res.status(500).json({ message: "Request Failed" });
          }
         
      
        return res.status(200).json({movies})


        
    } catch (error) {
        console.log(error)

        
    }

})
//get movie byId




router.get('/movies/:id', async(req,res)=>{
    try {

        const id=req.params.id;
        console.log(id)
        const movies= await movieData.findById(id);


        if (!movies) {
            return res.status(500).json({ message: "Request Failed" });
          }
         
      
        return res.status(200).json({movies})


        
    } catch (error) {
        console.log(error)

        
    }

})



router.put('/movies/:id',async(req,res)=>{

    try {


        let id= req.params.id;
        const updateMovie={$set:req.body}
        const movie=await movieData.findByIdAndUpdate(id,updateMovie)
         return res.status(200).json({message:"Updated succesfully"})
       } catch (error) {

        console.log(error)
        
    }
})


//delete Movie


router.delete('/movies/:id',async(req,res)=>{
    try {

        let id=req.params.id;
        const movie=await movieData.findByIdAndRemove(id)
        if (!deleteddata)
         {
        return res.status(500).json({ message: "Something went wrong" });
         }
        return res.status(200).json({message:"Deleted Succesfully"})
        
    } catch (error) {

        
        res.json({message:`${error}`})
    
    }




})


router.delete('/movies/:id',async(req,res)=>{


        try{
         const id=req.params.id;
         console.log(id);
         const deleteddata=await movieData.findByIdAndDelete(id);
         
         return res.status(200).json({message:"Deleted Succesfully"})
         
        }
        catch(error)
        {
         res.json({message:`${error}`})
     }
         
     
})
module.exports=router;
