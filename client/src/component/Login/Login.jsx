import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LogSign.css'
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  
  const onResRecived=(data)=>{
    
    dispatch(userActions.login())
 
  
  }
  function isValidEmail(email) {
    // Regular expression for a basic email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  const addHandler = () => {
    if (!user.email || !user.password) {
      // Handle empty fields
      alert('Please fill in all fields.');
    } else if (!isValidEmail(user.email)) {
      // Handle invalid email format
      alert('Please enter a valid email address.');
    } else if (!user.password){
      // Handle password length requirement
      alert('Password must be at least 6 characters.');
    } else {
      // Form is valid, proceed with login or API call
      // Example: Call your login API here
    
    axios
      .post('http://localhost:5000/api/login', user)
      .then((response) => {

        const userId=response.data.data._id;
        const token=response.data.token;
        localStorage.setItem("userId",userId)
        localStorage.setItem("token",token)
        if (response.data.message === 'Login success') {
          // const userId=response.data.data._id
          alert(response.data.message);
          console.log(response.data)
          navigate('/movies');
         
        } else {
          console.error('Login failed');
        }
      }).then(onResRecived)
      

      .catch((error) => {
        console.error(error);
      });
  };
  }
  return (
    <div className="container">
      <form>
      <div className='header'>
            <div className='text'>Login</div>
        </div>
        <div className="inputs mb-3 form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="email"
            name="email"
            placeholder="youremail@gmail.com"
            onChange={inputHandler}
          
          />
        </div>
        <div className="inputs mb-3 form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            name="password"
           
            placeholder="**"
            onChange={inputHandler}
            
          />
        </div>
        <div className='submit-container'>
        {/* <button type="button" onClick={addHandler}>
          Submit
        </button> */}
        <div className='submit'onClick={addHandler}>Login</div>

        </div>
        <div className="forgot-password">Lost Password?<span>Click Here!</span></div>
        <div className='newuser'>
           Don't have an account? <Link to="/signup"><span>Sign up here</span> </Link>
        </div>
      </form>
    </div>
  );
};

export default Login