import React from 'react'

function AddSR() {
    return (
        <div className='container register-container'>
            <form>
                <h2 style={{ textAlign: "center", marginBottom: "5vh" }}>Register Sales Representative</h2>
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

export default AddSR