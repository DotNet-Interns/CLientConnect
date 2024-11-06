import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../Utils/cookie.js';
import { useUserInfo } from '../Contexts/User.jsx';
import { Navigate } from 'react-router-dom';
const server = import.meta.env.VITE_SERVER;

function AddCustomer() {
    const { contextUser } = useUserInfo();
    const [status, setStatus] = useState(false);
    const [customerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone: ""
    });

    const [validationErrors, setValidationErrors] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCustomerData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        setValidationErrors((prevValue) => ({
            ...prevValue,
            [name]: ""
        }));
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!customerData.firstName) {
            errors.firstName = "First name is required.";
            formIsValid = false;
        }else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(customerData.firstName)) {
            errors.firstName = "Invalid format!";
            formIsValid = false;
        }

        if (!customerData.lastName) {
            errors.lastName = "Last name is required.";
            formIsValid = false;
        }else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(customerData.lastName)) {
            errors.lastName = "Invalid format!";
            formIsValid = false;
        }

        if (!customerData.Address) {
            errors.Address = "Address is required.";
            formIsValid = false;
        }else if (!/[A-Za-z0-9'\.\-\s\,]/.test(customerData.Address)) {
            errors.Address = "Invalid format!";
            formIsValid = false;
        }

        if (!customerData.Company_name) {
            errors.Company_name = "Company name is required.";
            formIsValid = false;
        }else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(customerData.Company_name)) {
            errors.Company_name = "Invalid format!";
            formIsValid = false;
        }

        if (!customerData.Position) {
            errors.Position = "Position is required.";
            formIsValid = false;
        }else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(customerData.Position)) {
            errors.Position = "Invalid format!";
            formIsValid = false;
        }

        if (!customerData.email) {
            errors.email = "Email is required.";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
            errors.email = "Enter a valid email address.";
            formIsValid = false;
        }

        if (!customerData.phone) {
            errors.phone = "Phone number is required.";
            formIsValid = false;
        }else if (!/^\d{10}$/.test(customerData.phone)) {
            errors.phone = "Enter a valid phone number";
            formIsValid = false;
        }

        setValidationErrors(errors);
        return formIsValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const Auth_Token = getCookie("Auth_Token");
            const response = await axios.post(
                `${server}/api/Customers`,
                {
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    address: customerData.Address,
                    company: customerData.Company_name,
                    createdBy: contextUser.userId,
                    position: customerData.Position,
                    phoneNumber: customerData.phone,
                    email: customerData.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                }
            );

            if (response.data) {
                setStatus(true);
            }
        } catch (error) {
            alert("Error occurred while adding customer!");
        }
    };

    return (
        <div className="container register-container">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Add New Customer</h2>
                <div className="row">
                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="First_Name">First Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="firstName"
                            value={customerData.firstName}
                            className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
                            id="First_Name"
                            placeholder="Enter First Name"
                            required
                        />
                        <div className="invalid-feedback">{validationErrors.firstName}</div>
                    </div>

                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input
                            onChange={handleChange}
                            name="lastName"
                            value={customerData.lastName}
                            type="text"
                            className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
                            id="Last_Name"
                            placeholder="Enter Last Name"
                            required
                        />
                        <div className="invalid-feedback">{validationErrors.lastName}</div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Address">Address</label>
                    <input
                        onChange={handleChange}
                        name="Address"
                        value={customerData.Address}
                        type="text"
                        className={`form-control ${validationErrors.Address ? 'is-invalid' : ''}`}
                        id="Cust_Address"
                        placeholder="Enter Customer's Address"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Address}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Company">Company Name</label>
                    <input
                        onChange={handleChange}
                        name="Company_name"
                        value={customerData.Company_name}
                        type="text"
                        className={`form-control ${validationErrors.Company_name ? 'is-invalid' : ''}`}
                        id="Cust_Company"
                        placeholder="Enter Customer's Company Name"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Company_name}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Position">Position</label>
                    <input
                        onChange={handleChange}
                        name="Position"
                        value={customerData.Position}
                        type="text"
                        className={`form-control ${validationErrors.Position ? 'is-invalid' : ''}`}
                        id="Cust_Position"
                        placeholder="Enter Customer's Position in above Company"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Position}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        value={customerData.email}
                        type="email"
                        className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.email}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Phone_field">Phone</label>
                    <input
                        onChange={handleChange}
                        name="phone"
                        value={customerData.phone}
                        className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                        id="Phone_field"
                        placeholder="Enter Phone Number"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.phone}</div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {status && <Navigate to="/customers" />}
        </div>
    );
}

export default AddCustomer;
