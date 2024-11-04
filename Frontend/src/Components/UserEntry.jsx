import { Link } from "react-router-dom"

function UserEntry({uid,name,CreatedBy,CreatedAt}){

    return(
        <div className="container-fluid my-3 row" style={{backgroundColor:"#e9ecef"}}>
            <div className="col m-2">UserName : {name}</div>
            <div className="col m-2">CreatedBy : {CreatedBy}</div>
            <div className="col m-2">CreatedAt : {CreatedAt}</div>
        </div>
    )
}

export default UserEntry