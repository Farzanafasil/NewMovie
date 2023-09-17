import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const addHandler = () => {
    axios
      .post('http://localhost:5000/api/login', user)
      .then((response) => {
        if (response.data.message === 'Login success') {
          alert(response.data.message);
          navigate('/movies');
        } else {
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <form>
        <h1>SignIn</h1>
        <div className="mb-3 form-group">
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
        <div className="mb-3 form-group">
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
        <button type="button" onClick={addHandler}>
          Submit
        </button>
        <Link to="/signup">Don't have an account? Sign up here</Link>
      </form>
    </div>
  );
};

export default Login