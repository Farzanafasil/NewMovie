import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import { useDispatch } from 'react-redux'
 import { theaterActions } from '../../store';

const TheaterLogin = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [input, setInput] = useState({
        email:'',
        password:''
    })


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
      
    </form>
  </div>
  )
}

export default TheaterLogin