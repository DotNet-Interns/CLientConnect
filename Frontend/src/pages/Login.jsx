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

  const handleChange = (event) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required!';
    }
    if (!formData.password) {
      errors.password = 'Password is required!';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${server}/api/Auth`, {
          Password: formData.password,
          Email: formData.email,
        });

        setLoggedIn(true);
        setCookie('Auth_Token', response.data.token, 1);
        setContextUser(response.data.user);
      } catch (error) {
        console.log(error)
        if(error.response?.data?.errors){
            alert(error.response.data.errors.Email);
        }
        else{
            alert(error.response?.data);
        }
        setFormData({ email: '', password: '' });
      }
    }
  };

  return (
    <div className="login d-flex text-light justify-content-center align-items-center vh-100">
      <div className="login-container p-3 border rounded-3">
        <h3 className="text-center mb-4">Login</h3>
        <form
          className="needs-validation"
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
              className={`form-control ${formErrors.email && submitted ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailFeedback"
              required
            />
            <div id="emailFeedback" className="invalid-feedback">
              {formErrors.email || 'Please provide a valid email address.'}
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
              className={`form-control ${formErrors.password && submitted ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
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
