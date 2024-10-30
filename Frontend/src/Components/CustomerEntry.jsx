import { Link } from "react-router-dom";

function CustomerEntry({cid , name , CreatedBy , CreatedAt}){

    return(
        <div className="container-fluid my-3 row" style={{backgroundColor:"#e9ecef"}}>
            <div className="col m-2">Customer : {name}</div>
            <div className="col m-2">CreatedBy : {CreatedBy}</div>
            <div className="col m-2">CreatedAt : {CreatedAt}</div>
            <button className="col-sm-1 m-2"><Link to={`/view/customer/${cid}`}>Show</Link></button>
        </div>
    )
}

export default CustomerEntry