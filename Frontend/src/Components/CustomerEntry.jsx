import { Link } from "react-router-dom";

function CustomerEntry({ cid, name, CreatedBy, CreatedAt }) {

    return (
        <div className="container-fluid my-3 row mx-auto" style={{ backgroundColor: "#e9ecef" }}>
            <div className="col m-2">Customer : {name}</div>
            <div className="col m-2">CreatedBy : {CreatedBy}</div>
            <div className="col m-2">CreatedAt : {CreatedAt}</div>
            <Link className="col-md-1 m-2" to={`/view/customer/${cid}`}>
                <button className="rounded-2 col-12 btn p-0" style={{ border: '1px solid #666362 ' }}>Show</button>
            </Link>

        </div>
    )
}

export default CustomerEntry