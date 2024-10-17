import React, { useState } from 'react'
import * as helpers from '../Utils/validation.js';
// import CreateEmergenciesTable from '../../../utils/CreateEmergenciesTable';

function AddCustomer() {
    console.log("AddCustomer")
    const [customerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone : ""
    })



    const [ValidationErrors, setValidationErrors] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone : ""
    })

    const handleChange = (event) => {
        setCustomerData((prevValue) => {
            return ({
                ...prevValue,
                [event.target.name]: event.target.value
            })
        })

        setValidationErrors((prevValue) => {
            return ({
                ...prevValue,
                [event.target.name]: ""
            })
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        helpers.validateCustomerData(customerData , setValidationErrors);
    }

    return (
        <div className='container register-container'>
            <form>
                <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Add New Customer</h2>
                <div className='row '>
                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="First_Name">First Name</label>
                        <input onChange={handleChange} type="text" name='firstName' value={customerData.firstName} className="form-control" id="First_Name" placeholder="Enter First Name" />
                        <small>{ValidationErrors.firstName}</small>
                    </div>
                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input onChange={handleChange} name='lastName' value={customerData.lastName} type="text" className="form-control" id="Last_Name" placeholder="Enter Last Name" />
                        <small>{ValidationErrors.lastName}</small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Address">Address</label>
                    <input onChange={handleChange} name='Address' value={customerData.Address} type="text" className="form-control" id="Cust_Address" placeholder="Enter Customer's Address" />
                    <small>{ValidationErrors.Address}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Company">Company Name</label>
                    <input onChange={handleChange} name='Company_name' value={customerData.Company_name} type="text" className="form-control" id="Cust_Company" placeholder="Enter Customer's Company Name" />
                    <small>{ValidationErrors.Company_name}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="Cust_Position">Position</label>
                    <input onChange={handleChange} name='Position' value={customerData.Position} type="text" className="form-control" id="Cust_Position" placeholder="Enter Customer's Position in above Company" />
                    <small>{ValidationErrors.Position}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} name='email' value={customerData.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small>{ValidationErrors.email}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="Phone_field">Phone</label>
                    <input onChange={handleChange} name='phone' value={customerData.phone} className="form-control" id="Phone_field"  placeholder="Enter Phone Number" />
                    <small>{ValidationErrors.phone}</small>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddCustomer