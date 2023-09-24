const express=require('express')
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')
const BookingData = require('../model/Bookings'); 

  

  
 

  router.post('/newbooking', async(req,res)=>{
    console.log('f,j')
    try {
        const { userId, movieId, seatNumbers, totalPrice,date,ticketPrice } = req.body;
       
        
            const newBooking=await BookingData({ userId, movieId, seatNumbers, totalPrice,date:new Date(`${date}`),ticketPrice })
            newBooking.save()
            res.send(newBooking);
            return res.status(200).json({message:"Movie Booked"})
        

        
    } catch (error) {

        return console.log(error);

    }
})
  
  module.exports = router;
  