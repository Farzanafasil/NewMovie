import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendRecoveryEmail = () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    axios
      .post('http://localhost:5000/api/recover', { email })
      .then((response) => {
        if (response.status === 201) {
          setMessage('Recovery email sent successfully.');
          onClose(); // Close the password recovery form
        } else {
          setMessage('Failed to send recovery email.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('An error occurred while sending the recovery email.');
      });
  };

  return (
    <div className="password-recovery-form">
      <h2>Password Recovery</h2>
      <p>Enter your email address to receive a password recovery email.</p>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleSendRecoveryEmail}>Send Recovery Email</button>
      <p className="message">{message}</p>
    </div>
  );
};

export default PasswordRecovery;