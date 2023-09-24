const mongoose=require('mongoose');
const BookingSchema=mongoose.Schema({

    movieId: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      seatNumbers: {
        type: [String],
        required: true,
      },
      ticketPrice: { 
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
})

const BookingModel=mongoose.model('Booking',BookingSchema)
module.exports=BookingModel