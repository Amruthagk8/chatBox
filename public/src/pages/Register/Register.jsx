import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import Logo from '../../assets/logo.svg';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
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
    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/chatbox/c1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        toast.success(result.msg);
        localStorage.setItem('token', result.token); // Store token in local storage
        localStorage.setItem('userId',result.userId)
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
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </>
  );
}

export default Register;
