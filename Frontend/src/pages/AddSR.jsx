import React, { useState } from 'react'

function AddSR() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setFormData((prevValue)=>{
            return ({
                ...prevValue,
                [name] : value
            })
        })

        setErrors((prevValue)=>{
            return ({
                ...prevValue,
                [name] : ""
            })
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
    }

    return (
        <div className='container register-container'>
            <form>
                <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Register Sales Representative</h2>
                <div className='row '>
                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="First_Name">First Name</label>
                        <input onChange={handleChange} name='firstName' value={formData.firstName} type="text" className="form-control" id="First_Name" placeholder="Enter First Name" />
                        <small>{errors.firstName}</small>
                    </div>
                    <div className="form-group col-sm-6 mt-2">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input onChange={handleChange} name='lastName' value={formData.lastName} type="text" className="form-control" id="Last_Name" placeholder="Enter Last Name" />
                        <small>{errors.lastName}</small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} name='email' value={formData.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small>{errors.email}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange} name='password' value={formData.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    <small>{errors.password}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input onChange={handleChange} name='confirmPassword' value={formData.confirmPassword} type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
                    <small>{errors.confirmPassword}</small>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddSR