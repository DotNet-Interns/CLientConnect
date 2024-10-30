import { Link } from "react-router-dom";

function CustomerEntry({ cid, name, CreatedBy, CreatedAt }) {

    return (
        <div className="container-fluid my-3 row" style={{ backgroundColor: "#e9ecef" }}>
            <div className="col m-2">Customer : {name}</div>
            <div className="col m-2">CreatedBy : {CreatedBy}</div>
            <div className="col m-2">CreatedAt : {CreatedAt}</div>
            <Link className="col-sm-1 m-2" to={`/view/customer/${cid}`}>
                <button className="w-75 rounded-2 btn p-0" style={{ border: '1px solid #666362 ' }}>Show</button>
            </Link>

        </div>
    )
}

export default CustomerEntry