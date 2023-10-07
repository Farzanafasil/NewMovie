import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import { useDispatch } from 'react-redux'
 import { theaterActions } from '../../store';

const TheaterLogin = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [errors, setErrors] = useState({
      
      email: '',
      password: '',
    });

    const [input, setInput] = useState({
        email:'',
        password:''
    })
    const validateForm = () => {
      let isValid = true;
      const newErrors = {};
  
      // Validate name (required)
      
  
      // Validate email (required and valid format)
      if (!input.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input.email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
  
      
      if (!input.password.trim()) {
        newErrors.password = 'Password is required';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };

    const inputHandler=(e)=>{

        setInput({
           ...input,
          [e.target.name]:e.target.value,
        });
        console.log(input)

    }
    const onResRecived=(data)=>{
      console.log('theater',data);
      
      dispatch(theaterActions.login())
   
    }

    const addHandler=(e)=>{
       e.preventDefault()
       if (validateForm()){
       axios.post('http://localhost:5000/api/theaterlogin/',input)
       .then((response)=>{

        const  theaterId=response.data.theater._id
    
        const token=response.data.token;
        localStorage.setItem("theaterId",theaterId)
        localStorage.setItem("token",token)
      
        if(response.data.message==="Login success")
        {
          alert(response.data.message);
          console.log(response.data)
          navigate('/theaterdashboard')
        }

       })
       .then((onResRecived))
       .catch((error)=>{
        console.log(error)
       })
      }
    }

  return (
    <div className="">
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
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          placeholder="youremail@gmail.com"
          onChange={inputHandler}
        />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="inputs mb-3 form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          name="password"
          placeholder="**"
          onChange={inputHandler}
        />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className='submit-container'>
      {/* <button type="button" onClick={addHandler}>
        Submit
      </button> */}
      <div className='submit'onClick={addHandler}>Login</div>

      </div>
      <div className="forgot-password">Lost Password?<span>Click Here!</span></div>
      
    </form>
  </div>
  )
}

export default TheaterLogin