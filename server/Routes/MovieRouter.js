const express=require('express')
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')


const movieData=require('../model/Movies')




//add Movies
router.post('/movies',async(req,res)=>{
    let movie;
    // let TheaterAdmin;
   
             try {
                  const { title, description,releaseDate, posterUrl, featured, actors ,duration,genre,language} = req.body;
            //       jwt.verify(req.body.token,"Movie",(error,decoded)=>{
            //          if(decoded&&decoded.email)

            //           { 

            //           }
            //           else{
            //                 res.json({message:"Unauthorized User"})
            //              }
            // })
                        const existingtitle=await movieData.findOne({title:title})
                        console.log(existingtitle);
                        if(existingtitle)
                        {
                           res.json({message:"Movie Already Exist"})
                       
                        }
                         else{

                        
                        //  TheaterAdmin=decoded.id;

    
                       const movie = new movieData({title,description, releaseDate: new Date(`${releaseDate}`),actors,duration,language ,genre,posterUrl ,featured});
                    //    theater:TheaterAdmin,

                      movie.save();
                      return res.status(201).json({message:"Movie Added"})
                
                         }
                   
             
        
        
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
         
      
        return res.status(201).json({movies})
        // res.send(movies);


        
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
        console.log(id)
        const movie= await movieData.findById(id)
        
        if(!movie)
        {
            res.json({message:"Movies not found"})
        }
        else
        { 
            const deletedmovie=await movieData.findByIdAndDelete(id)
      
    
            res.status(201).json({message:"Deleted Succesfully"})

        }
       
        
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


router.get('/movie/search', async (req, res) => {
    try {
      const { title } = req.query; // Extract the 'title' query parameter from the URL
  
      if (!title) {
        return res.status(400).json({ message: 'Title parameter is required for the search.' });
      }
  
      // Use a MongoDB query to find movies with titles that match the provided title
      const movies = await movieData.find({
        title: { $regex: title, $options: 'i' } // Case-insensitive title search
      });
  
      res.status(200).json(movies);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports=router;
