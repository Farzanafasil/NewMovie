import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const token= localStorage.getItem("token");
 const navigate=useNavigate()

  useEffect(() => {
    // Fetch the user's bookings here
    const userId = localStorage.getItem("userId");
    console.log(userId)
    if(!token){
      navigate('/unauth')
    }
    axios
      .get(`http://localhost:5000/api/booking/${userId}`)
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);
  
  const handleCancelBooking = (bookingId) => {
    axios.delete('http://localhost:5000/api/cancelbooking/'+bookingId).then((response)=>{
        if(response.data.message==='Booking canceled successfully')
        alert(response.data.message)

    }).catch((error)=>{
        console.log(error)
    })
  };
  
  return (
    <Box>
    <Typography variant="h4" style={{ textAlign: 'center', marginTop: '40px' }}>My Bookings</Typography>
      <div style={{ maxWidth: "800px", margin: "0 auto"}}>
    <TableContainer component={Paper} mt={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Seats</TableCell>
            <TableCell>Ticket Price</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        
        {bookings.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No details
      </TableCell>
    </TableRow>
  ) : (
    bookings.map((booking,index) => (
      <TableRow key={index}>
        <TableCell>{booking._id}</TableCell>
        <TableCell>{booking.movieName}</TableCell>
        <TableCell>{new Date(booking.date).toDateString()}</TableCell>
        <TableCell>{booking.seatNumbers.join(", ")}</TableCell>
        <TableCell>${booking.ticketPrice}</TableCell>
        <TableCell>${booking.totalPrice}</TableCell>
        <TableCell>
          {/* Check if the booking date is in the future */}
          {new Date(booking.date) > new Date() ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleCancelBooking(booking._id)}
            >
              Cancel Booking
            </Button>
          ) : (
            "Expired" // Display a message for expired bookings
          )}
        </TableCell>
      </TableRow>
    ))
  )}
        
        
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </Box>
);
};
export default Mybooking;