import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const RoleCheck = ({children}) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();

    // if(!user.state.isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location}} replace />
    // }
 return children

};

export default RoleCheck;