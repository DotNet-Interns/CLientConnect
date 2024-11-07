import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../Utils/cookie.js';
import { useUserInfo } from '../Contexts/User.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
const server = import.meta.env.VITE_SERVER;

function AddCustomer() {
    const { contextUser } = useUserInfo();
    const navigate = useNavigate();
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

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCustomerData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errors = { ...validationErrors };

        switch (name) {
            case "firstName":
                if (!value) {
                    errors.firstName = "First name is required.";
                } else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(value)) {
                    errors.firstName = "Invalid format!";
                } else {
                    errors.firstName = "";
                }
                break;
            case "lastName":
                if (!value) {
                    errors.lastName = "Last name is required.";
                } else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(value)) {
                    errors.lastName = "Invalid format!";
                } else {
                    errors.lastName = "";
                }
                break;
            case "Address":
                if (!value) {
                    errors.Address = "Address is required.";
                } else if (!/^[A-Za-z0-9'\.\-\s\,]+$/.test(value)) {
                    errors.Address = "Invalid format!";
                } else {
                    errors.Address = "";
                }
                break;
            case "Company_name":
                if (!value) {
                    errors.Company_name = "Company name is required.";
                } else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/.test(value)) {
                    errors.Company_name = "Invalid format!";
                } else {
                    errors.Company_name = "";
                }
                break;
            case "Position":
                if (!value) {
                    errors.Position = "Position is required.";
                } else if (!/^[a-zA-Z]+(?:[ .][a-zA-Z0-9]+)*$/.test(value)) {
                    errors.Position = "Invalid format!";
                } else {
                    errors.Position = "";
                }
                break;
            case "email":
                if (!value) {
                    errors.email = "Email is required.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    errors.email = "Enter a valid email address.";
                } else {
                    errors.email = "";
                }
                break;
            case "phone":
                if (!value) {
                    errors.phone = "Phone number is required.";
                } else if (!/^\d{10}$/.test(value)) {
                    errors.phone = "Enter a valid phone number.";
                } else {
                    errors.phone = "";
                }
                break;
            default:
                break;
        }

        setValidationErrors(errors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        Object.keys(customerData).forEach((key) => validateField(key, customerData[key]));

        if (Object.values(validationErrors).some((error) => error)) {
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
            if (response.status === 201) {
                navigate('/customers');
            }
        } catch (error) {
            console.log(error);
            // console.log(customerData);
        }
    };

    return (
        <>
            <Navbar ifAdmin={(contextUser?.role === 0) ? true : false} />
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
                            className={`form-control ${validationErrors.firstName || (submitted && !customerData.firstName) ? 'is-invalid' : ''}`}
                            id="First_Name"
                            placeholder="Enter First Name"
                            required
                        />
                        <div className="invalid-feedback">{validationErrors.firstName || (submitted && !customerData.firstName ? 'First name is required.' : '')}</div>
                    </div>

                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input
                            onChange={handleChange}
                            name="lastName"
                            value={customerData.lastName}
                            type="text"
                            className={`form-control ${validationErrors.lastName || (submitted && !customerData.lastName) ? 'is-invalid' : ''}`}
                            id="Last_Name"
                            placeholder="Enter Last Name"
                            required
                        />
                        <div className="invalid-feedback">{validationErrors.lastName || (submitted && !customerData.lastName ? 'Last name is required.' : '')}</div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Address">Address</label>
                    <input
                        onChange={handleChange}
                        name="Address"
                        value={customerData.Address}
                        type="text"
                        className={`form-control ${validationErrors.Address || (submitted && !customerData.Address) ? 'is-invalid' : ''}`}
                        id="Cust_Address"
                        placeholder="Enter Customer's Address"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Address || (submitted && !customerData.Address ? 'Address is required.' : '')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Company">Company Name</label>
                    <input
                        onChange={handleChange}
                        name="Company_name"
                        value={customerData.Company_name}
                        type="text"
                        className={`form-control ${validationErrors.Company_name || (submitted && !customerData.Company_name) ? 'is-invalid' : ''}`}
                        id="Cust_Company"
                        placeholder="Enter Customer's Company Name"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Company_name || (submitted && !customerData.Company_name ? 'Company name is required.' : '')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Position">Position</label>
                    <input
                        onChange={handleChange}
                        name="Position"
                        value={customerData.Position}
                        type="text"
                        className={`form-control ${validationErrors.Position || (submitted && !customerData.Position) ? 'is-invalid' : ''}`}
                        id="Cust_Position"
                        placeholder="Enter Customer's Position in above Company"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.Position || (submitted && !customerData.Position ? 'Position is required.' : '')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        value={customerData.email}
                        type="email"
                        className={`form-control ${validationErrors.email || (submitted && !customerData.email) ? 'is-invalid' : ''}`}
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.email || (submitted && !customerData.email ? 'Email is required.' : '')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="Phone_field">Phone</label>
                    <input
                        onChange={handleChange}
                        name="phone"
                        value={customerData.phone}
                        className={`form-control ${validationErrors.phone || (submitted && !customerData.phone) ? 'is-invalid' : ''}`}
                        id="Phone_field"
                        placeholder="Enter Phone Number"
                        required
                    />
                    <div className="invalid-feedback">{validationErrors.phone || (submitted && !customerData.phone ? 'Phone number is required.' : '')}</div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
}

export default AddCustomer;
