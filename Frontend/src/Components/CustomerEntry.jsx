function CustomerEntry(){

    return(
        <div className="container-fluid my-3 row" style={{backgroundColor:"#e9ecef"}}>
            <div className="col m-2">CustomerName: Name</div>
            <div className="col m-2">CreatedBy: Name</div>
            <div className="col m-2">CreatedAt: 09:00</div>
            <button className="col-1 m-2">Show</button>
        </div>
    )
}

export default CustomerEntry