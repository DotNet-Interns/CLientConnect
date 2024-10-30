import { Link } from "react-router-dom"

function UserEntry({uid,name,CreatedBy,CreatedAt}){

    return(
        <div className="container-fluid my-3 row" style={{backgroundColor:"#e9ecef"}}>
            <div className="col m-2">UserName : {name}</div>
            <div className="col m-2">CreatedBy : {CreatedBy}</div>
            <div className="col m-2">CreatedAt : {CreatedAt}</div>
            <Link className="col-sm-1 m-2" to={`/view/user/${uid}`}>
                <button className=" w-100 rounded-2   " onClick={()=>alert(uid)} style={{ border: '1px solid #666362 ' }}>Show</button>
            </Link>
        </div>
    )
}

export default UserEntry