import React from 'react'

function AddCustomer() {
      
    return (
        <div className='container register-container'>
            <form>
                <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Add New Customer</h2>
                <div className='row '>
                    <div className="form-group col-sm-6 mt-2">
                        <label for="First_Name">First Name</label>
                        <input type="text" className="form-control" id="First_Name" placeholder="Enter First Name" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group col-sm-6 mt-2">
                        <label for="Last_Name">Last Name</label>
                        <input type="text" className="form-control" id="Last_Name" placeholder="Enter Last Name" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </div>

                <div className="form-group">
                    <label for="Cust_Address">Address</label>
                    <input type="text" className="form-control" id="Cust_Address" placeholder="Enter Customer's Address" />
                </div>

                <div className="form-group">
                    <label for="Cust_Company">Address</label>
                    <input type="text" className="form-control" id="Cust_Company" placeholder="Enter Customer's Company Name" />
                </div>

                <div className="form-group">
                    <label for="Cust_Position">Address</label>
                    <input type="text" className="form-control" id="Cust_Position" placeholder="Enter Customer's Position in above Company" />
                </div>

                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <div className="form-group">
                    <label for="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddCustomer