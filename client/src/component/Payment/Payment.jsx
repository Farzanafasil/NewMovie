import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';

function Payment() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    // Simulate a payment process (you can set a timer or delay to mimic processing)
    setTimeout(() => {
      // Set the paymentConfirmed flag to true
      setPaymentConfirmed(true);
    }, 2000); // Simulating a 2-second delay for processing

    // You can also perform other actions related to payment here if needed
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>
      {paymentConfirmed ? (
        <div>
          <Typography variant="h6">Payment confirmed!</Typography>
          <Typography variant="body1">Movie booked successfully.</Typography>
        </div>
      ) : (
        <div>
          <Typography variant="body1">Please confirm your payment.</Typography>
          <Button variant="contained" color="primary" onClick={handleConfirmPayment}>
            Confirm Payment
          </Button>
        </div>
      )}
    </div>
  );
}

export default Payment;