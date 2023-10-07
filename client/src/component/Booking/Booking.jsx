import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useLocation,useNavigate } from 'react-router-dom';
import './Booking.css'; 


function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketRate] = useState(10); // Set your ticket rate here
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem('userId');
  const { movieId } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
 
  const [validationError, setValidationError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieTitle = queryParams.get('title');
  const navigate=useNavigate()
  const [bookingId, setBookingId] = useState(null);
  const [email, setEmail] = useState('');
  // const [isTaskCompleted, setIsTaskCompleted] = useState(false);


  const [bookedSeats, setBookedSeats] = useState([]);
  const numRows = 6;
  const seatsPerRow = 10;
  const totalSeats = Array.from({ length: numRows * seatsPerRow }, (_, index) => `A ${index + 1}`);
  console.log('movie is',movieTitle)

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`http://localhost:5000/api/booking/${movieId}/${selectedDate}`)
        .then((response) => {
          const bookedSeatsData = response.data;
          setBookedSeats(bookedSeatsData);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, [selectedDate, movieId]);

  const selectDateChange = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
    setTotalPrice(0);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }

    calculateTotalPrice(selectedSeats.length + 1);
  };

  const calculateTotalPrice = (numSeats) => {
    const price = numSeats * ticketRate;
    setTotalPrice(price);
  };

  
    const renderSeatRows = () => {
      const seatRows = [];
      for (let row = 0; row < numRows; row++) {
        const rowSeats = totalSeats.slice(row * seatsPerRow, (row + 1) * seatsPerRow);
        seatRows.push(
          <div className="seat-row" key={`row-${row}`}>
            {rowSeats.map((seat) => (
              <button
                key={seat}
                className={`seat ${bookedSeats.includes(seat) ? 'booked' : selectedSeats.includes(seat) ? 'selected' : 'available'}`}
                onClick={(e) => handleSeatClick(seat)}
                disabled={bookedSeats.includes(seat)}
                style={{ width: '50px', height: '50px', borderRadius: '3px' }}
              >
                {seat}
              </button>
            ))}
          </div>
        );
      }
      return seatRows;
    };
  
  

  const handleConfirm=(e)=>{
    e.preventDefault();
    if (!email) {
      setValidationError('Please enter a mobile number or email.');
      return;
    }
   
    const newBooking={
      userId:userId,
      movieId:movieId,
      date:selectedDate,
      seatNumbers:selectedSeats,
      ticketPrice:ticketRate,
      totalPrice:totalPrice,
      movieName:movieTitle
     

    }
   
   
    axios.post('http://localhost:5000/api/newbooking',newBooking).then((response)=>{
      

    if (response.status === 201) {
     
      axios
      .post('http://localhost:5000/api/sendconfirmationemail', {
        email: email, // Use the email address entered by the user
        message: 'Thank you for your booking!', // Customize your confirmation message
      })
          .then(() => {
            alert('Booking successful! Confirmation email sent.');
            const confirmBookingId = response.data.booking._id;
            setBookingId(confirmBookingId);
            navigate(`/bookingdetails/${confirmBookingId}`);
          })
          .catch((error) => {
            alert('Booking successful, but confirmation email could not be sent.');
            console.error('Error sending confirmation email:', error);
          });
      } else {
        alert('Booking failed: ' + response.data.message);
      }
    setShowConfirmation(false);
    })
  }
  const handleConfirmBooking = () => {
    setShowConfirmation(true);
  };

  const handleCancelBooking = () => {
    setShowConfirmation(false);
    navigate('/movies')
  };
  

  return (
  
      
    <div className='main' style={{ width:'100%',height:'100%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px',paddingTop:'50px' }} > 
    <div className='container'>
     <div style={{ textAlign: 'center' }}>  
      <label>Moviename</label>
      <input
       type="text"
       value={movieTitle}
       readOnly
       style={{ background: 'none', textAlign: 'center', fontSize: '18px',color: 'rgb(247, 0, 255)' }}
     />
     </div> 
     <div className="booking-header" style={{ marginBottom: '20px' }}>
      {/* <h3>Select Date</h3> */}
         <label>SelecteDate</label>
         <input
         type="date"
         value={selectedDate}
         // onChange={(e) => selectDateChange(e)}
         onChange={selectDateChange}
        />
     </div>
 

   <div className="booking-content" style={{ display: 'flex' }}>
   
      <div className="seat-layout">
      <button className="status-button booked">Booked</button>
      <button className="status-button selected">Selected Seats</button>
      <button className="status-button available">Available</button>
      
      {renderSeatRows()}
      </div>
  </div> 
  <div className="selected-seats" style={{ display: 'flex', marginTop: '20px' }}>
    <h3>Selected Seats</h3>
    <p>{selectedSeats.join(', ')}</p>
  </div>

  <div className="ticket-total-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
    <div className="ticket-rate">
      <h2>Ticket Rate</h2>
      <p>${ticketRate} per seat</p>
    </div>
    <div className="total-price">
      <h2>Total Price</h2>
      <p>${totalPrice}</p>
    </div>
  </div>

  <div style={{ textAlign: 'center',justifyContent:'space-between' }}>
   
      <button
       type="button" 
       onClick={handleConfirmBooking}
       style={{
        width: '150px',  // Set the desired width
        backgroundColor: 'red',  // Set the desired background color
        color: 'white',  // Set the text color
        borderRadius: '5px',  // Set the border radius
        padding: '10px',  // Set padding
        fontSize: '16px',  // Set font size
        cursor: 'pointer',  // Add pointer cursor on hover
        border: 'none',  // Remove border
      }}>Confirm Booking</button>
  </div>

  {showConfirmation && (
        <div className="confirmation-modal">
        <h3>Confirm Booking</h3>
        <input
          type="email"
          required
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // {(e) => setContactInfo(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button   type="button" // Add this line
            onClick={handleConfirm} style={{ width: '100px', backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>
            Confirm
          </button>
          <button 
           type="button" // Add this line
            onClick={handleCancelBooking} style={{ width: '100px' }}>
            Cancel
          </button>
        </div>
      
          {validationError && <p className="validation-error">{validationError}</p>}
        </div>
      )}
 
  
   </div>
   </div> 
 
);
}

export default BookingPage;