import axios from 'axios';
import React, { useState } from 'react';
import { getCookie } from '../Utils/cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useUserInfo } from '../Contexts/User';
const server = import.meta.env.VITE_SERVER;

function AddSR() {
    const { contextUser } = useUserInfo();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                if (!value) return "First Name is required!";
                else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(value)) return "Invalid format!";
                break;
            case 'lastName':
                if (!value) return "Last Name is required!";
                else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(value)) return "Invalid format!";
                break;
            case 'email':
                if (!value) return "Email is required!";
                else if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid!";
                break;
            case 'password':
                if (!value) return "Password is required!";
                else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value)) return "Password should contain characters in both cases, number and special character"
                break;
            case 'confirmPassword':
                if (!value) return "Confirm Password is required!";
                else if (value !== formData.password) return "Password and confirm password do not match!";
                break;
            default:
                return "";
        }
        return "";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        const errorMessage = validateField(name, value);
        setErrors((prevValue) => ({
            ...prevValue,
            [name]: errorMessage
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = Object.keys(formData).reduce((acc, key) => {
            const errorMessage = validateField(key, formData[key]);
            if (errorMessage) acc[key] = errorMessage;
            return acc;
        }, {});

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const Auth_Token = getCookie("Auth_Token");
            const response = await axios.post(
                `${server}/api/Users`,
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                },
                { headers: { Authorization: `Bearer ${Auth_Token}` } }
            );
            // console.log(response);
            if (response.data) {
                navigate("/srList");
            } else {
                console.log("Error: ", response);
            }
        } catch (error) {
            console.log("Error during registration:", error);
        }
    };

    return (
        <>
            <Navbar ifAdmin={(contextUser?.role === 0) ? true : false} />
            <div className='container register-container'>
                <form className='form-control' onSubmit={handleSubmit} noValidate>
                    <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Register Sales Representative</h2>
                    <div className='row'>
                        <div className="form-group col-sm-6 mt-2">
                            <label htmlFor="First_Name">First Name</label>
                            <input
                                onChange={handleChange}
                                name='firstName'
                                value={formData.firstName}
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                id="First_Name"
                                placeholder="Enter First Name"
                                required
                            />
                            <small className="text-danger">{errors.firstName}</small>
                        </div>

                        <div className="form-group col-sm-6 mt-2">
                            <label htmlFor="Last_Name">Last Name</label>
                            <input
                                onChange={handleChange}
                                name='lastName'
                                value={formData.lastName}
                                type="text"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                id="Last_Name"
                                placeholder="Enter Last Name"
                            />
                            <small className="text-danger">{errors.lastName}</small>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            onChange={handleChange}
                            name='email'
                            value={formData.email}
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small className="text-danger">{errors.email}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            onChange={handleChange}
                            name='password'
                            value={formData.password}
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                        <small className="text-danger">{errors.password}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                        <input
                            onChange={handleChange}
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            id="exampleInputPassword2"
                            placeholder="Confirm Password"
                        />
                        <small className="text-danger">{errors.confirmPassword}</small>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default AddSR;
