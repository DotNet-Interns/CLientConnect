import React, { useState } from 'react';
// import Cookies from 'js-cookie;'
import '../styles/Login.css'; // Import the CSS file

import * as helpers from "../Utils/validation";
import * as cookie from "../Utils/cookie";
// import * as helpers from "../Utils/validation";
import { loginValidation } from '../Utils/validation';
import axios from "axios"
const server = import.meta.env.VITE_SERVER;



const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        setFormData((prevValue) => {
            return ({
                ...prevValue,
                [event.target.name]: event.target.value
            })
        })

        setErrors((prevValue) => {
            return ({
                ...prevValue,
                [event.target.name]: ""
            })
        })
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(loginValidation(formData , setErrors)){
            try {
                const response = await axios.post(`http://172.20.68.11:5100/api/Auth`,{
                    Password : formData.password,
                    Email : formData.email
                });
                console.log(response);
                
            } catch (error) {
                console.log(error);
                
            }
        }
    };

    return (
        <div className="login d-flex text-light  justify-content-center align-items-center vh-100">

            <div className="login-container p-3 border rounded-3">
                <h3 className="text-center mb-4">Login</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <small>{errors.email}</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <small>{errors.password}</small>
                    </div>

                    <button type='submit' onClick={handleSubmit} className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
