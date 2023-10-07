
import { Box } from "@mui/system";
import React, {  Fragment,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import Sidebar from '../TheaterOwner/Sidebar';
import { Navigate } from "react-router-dom";

const TheaterProfile = () => {
    const [admin, setAdmin] = useState([]);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate=useNavigate()
    const theaterId=localStorage.getItem("theaterId")

  const token= localStorage.getItem("token")
    const profileStyles = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };
  
   
    const userDetailsStyles = {
      textAlign: 'center',
      marginTop: '20px',
    };
  
    const actionStyles = {
      marginTop: '20px',
    };
  
   
    useEffect(()=> {
      if(!token)
      {
        navigate('/unauth')
      }
    try {
   
    console.log(theaterId)
     axios.get(`http://localhost:5000/api/theater/${theaterId}`).then((response)=>{

        console.log(response.data.TheaterAdmin)
        setAdmin(response.data.TheaterAdmin)
        console.log('admin', admin)
   
    
   })


} catch (error) {
    
}

    },[])
    const handlePasswordChange = () => {
      console.log('theaterId is:', theaterId);
      console.log('newPassword is:', newPassword);
      
    
      // Create an object with a 'password' property
    const password={
      password:newPassword,
    }
  console.log(password)
      axios
      .put('http://localhost:5000/api/theater/' +theaterId,password)
        .then((response) => {
          if (response.status === 201) {
            alert(response.data.message);
            navigate('/theaterlogin')
            console.log(response.data)
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordFields(false);
    };
  
      
    console.log(admin);
    return (
    <div>
      <Sidebar/>
   
      <div style={profileStyles}>
      
      <div style={userDetailsStyles}>
        <h2>Theater1</h2>
        <p>Email:{admin.email}</p>
        <p>Role: Administrator</p>
      </div>
      <div style={actionStyles}>
       
        <ul>
          
          <li>
           <button onClick={() => setShowPasswordFields(!showPasswordFields)}>
              Change Password
              </button>
           </li>
          
        </ul>
      </div>
    </div>

    {showPasswordFields && (
    
        <div>
          <form on onSubmit={handlePasswordChange}>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordsMatch && (
          <p style={{ color: 'red' }}>Passwords do not match. Please re-enter.</p>
         )}
          <button>Submit</button>
          </form>
        </div>
       
      )}
    
    </div>
    );
  };

export default TheaterProfile