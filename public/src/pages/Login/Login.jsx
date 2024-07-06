import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import Logo from '../../assets/logo.svg';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/chatbox/c1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.msg);
        localStorage.setItem('token', result.token); // Store token in local storage
        navigate('/');
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
      </div>
    </>
  );
}

export default Login;
