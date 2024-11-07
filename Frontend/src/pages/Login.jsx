import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '../Contexts/User';
import { setCookie } from '../Utils/cookie';

const server = import.meta.env.VITE_SERVER;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const { loggedIn, setContextUser, setLoggedIn } = useUserInfo();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const validateForm = (name, value) => {
    const errors = {};

    if (name === 'email' && !value) {
      errors.email = 'Email is required!';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errors.email = 'Enter a valid email address.';
    } else if(name === 'email'){
      errors.email = ''
    }

    if (name === 'password' && !value) {
      errors.password = 'Password is required!';
    } else if(name === 'password'){
      errors.password = '';
    }

    setFormErrors(errors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    validateForm(name, value);
  };

  const handleBlur = async (event) => {
    const { name, value } = event.target;
    validateForm(name, value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    validateForm('email', formData.email);
    validateForm('password', formData.password);
    if (formErrors.email?.length || formErrors.password?.length) {
      return;
    }

    try {
      const response = await axios.post(`${server}/api/Auth`, {
        Password: formData.password,
        Email: formData.email,
      });

      setLoggedIn(true);
      setCookie('Auth_Token', response.data.token, 1);
      setContextUser(response.data.user);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.Email || 'Error occurred');
      } else {
        alert(error.response?.data || 'Error occurred');
      }
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="login d-flex text-light justify-content-center align-items-center vh-100">
      <div className="login-container p-3 border rounded-3">
        <h3 className="text-center mb-4">Login</h3>
        <form
          className={`needs-validation`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby="emailFeedback"
              required
            />
            <div id="emailFeedback" className="invalid-feedback">
              {formErrors.email || 'Email is required!'}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <div id="passwordFeedback" className="invalid-feedback">
              {formErrors.password || 'Password is required!'}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
      {loggedIn && <Navigate to={redirectPath} replace />}
    </div>
  );
};

export default Login;
