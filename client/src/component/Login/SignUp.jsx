import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './LogSign.css'

const SignUp = () => {
  const [user, setUser] = useState({})

  const navigate = useNavigate();

  const inputHandle = (e) => {
   
    setUser({
    
      ...user,
      [e.target.name]: e.target.value,
      
    });
  };


  const submit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/api/user', user)
      .then((response) => {
        console.log('response')
        console.log(response.data.message)
        if (response.status===201) {
          alert(response.data.message);
          navigate('/login');
        }
        else {
            alert(response.data.message);   
        }
      })
      .catch(err => console.log(err));
    
  };



  
   
  return (
    <div className='container p-6 '>
       <div className='header'>
            <div className='text'>SignUp</div>
        </div>


<div className="inputs mb-3">
    <label for="exampleInputEmail1" class="form-label">name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name='name'
    onChange={inputHandle}
    
    />
    
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="text" class="form-control" id="email" aria-describedby="emailHelp" name='email'
    onChange={inputHandle}/>
    
  </div>
  <div className="inputs mb-3">
    <label for="exampleInputPassword1" class="form-label">phone</label>
    <input type="password" class="form-control" id="phone" name='phone'
    onChange={inputHandle}/>
  </div>
  <div className="inputs mb-3">
    <label for="exampleInputEmail1" class="form-label">Password</label>
    <input type="text" class="form-control" id="password" aria-describedby="emailHelp" name='password'
    onChange={inputHandle}/>
    
  </div>
  {/* <button type="submit" class="btn btn-primary" onClick={submit}>Submit</button> */}
  <div className='submit-container'>
        {/* <button type="button" onClick={addHandler}>
          Submit
        </button> */}
        <div className='submit'onClick={submit}>Submit</div>

        </div>

   
    </div>

);
  
}

export default SignUp