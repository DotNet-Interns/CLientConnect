function UserEntry(){

    return(
        <div className="container-fluid my-3 row" style={{backgroundColor:"#e9ecef"}}>
            <div className="col m-2">UserName: Name</div>
            <div className="col m-2">CreatedBy: Name</div>
            <div className="col m-2">CreatedAt: 09:00</div>
            <button className="col-md-1 m-2">Show</button>
        </div>
    )
}

export default UserEntry