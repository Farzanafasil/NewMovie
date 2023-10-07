import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SignUp = (props) => {
   console.log(props)
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    ...props.data
  })
  
  console.log(user);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name (required)
    if (!user.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email (required and valid format)
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(user.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // // Validate phone (required)
    // if (!user.phone.trim()) {
    //   newErrors.phone = 'Phone is required';
    //   isValid = false;
    // }

    // Validate password (required)
    if (!user.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const inputHandle = (e) => {

    const{name,value}=e.target
    setUser({
     ...user,
     [name]:value
      
    });
  };


const submit = (e) => {
  console.log('btn clicked')
    e.preventDefault()
    if (validateForm()){
  let data={...user,}
  console.log(data);
  if(props.method==='post'){

  
    axios.post('http://localhost:5000/api/user',data)
      .then((response) => {
       
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


  
  
  if (props.method === 'put') {
    axios.put(`http://localhost:5000/api/user/${userId}`, user)
      .then((response) => {
        if (response.data.message === "Updated succesfully") 
        {
          alert(response.data.message);
          navigate('/userdashboard')
        }
         else
          {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
   }
  }   
}
  return (
    
    <div className='container p-6 '>
      <form>
       <div className='header'>
            <div className='text'>SignUp</div>
        </div>


<div className="inputs mb-3">
    <label for="exampleInputEmail1" class="form-label">  Name<span style={{ color: 'red' }}>*</span></label>
    <input type="text"  className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" aria-describedby="emailHelp" name='name' value={user.name}
    onChange={inputHandle}
    
    />
    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email<span style={{ color: 'red' }}>*</span></label>
    <input type="email"  className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" aria-describedby="emailHelp" name='email' value={user.email}
    onChange={inputHandle}/>
     {errors.email && <div className="invalid-feedback">{errors.email}</div>}
    
  </div>
  <div className="inputs mb-3">
    <label for="exampleInputPassword1" class="form-label">phone<span style={{ color: 'red' }}>*</span></label>
    <input type="password" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} id="phone" name='phone' value={user.phone}
    onChange={inputHandle}/>
      {errors.password && <div className="invalid-feedback">{errors.phone}</div>}
  </div>
  <div className="inputs mb-3">
    <label for="exampleInputEmail1" class="form-label">Password<span style={{ color: 'red' }}>*</span></label>
    <input type="text" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" aria-describedby="emailHelp" name='password'
    onChange={inputHandle}/>
     {errors.password && <div className="invalid-feedback">{errors.password}</div>}
  </div>
  {/* <button type="submit" class="btn btn-primary" onClick={submit}>Submit</button> */}
  <div className='submit-container'>
       
      
        <button type="button" className='submit'onClick={submit}>submit</button>

        </div>

        </form>
       
    </div>

);
  
}

export default SignUp