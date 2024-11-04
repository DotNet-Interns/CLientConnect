import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useUserInfo } from '../Contexts/User';

const ProtectedRoute = ({ children }) => {
    let location = useLocation();
    
    const { loggedIn } = useUserInfo();
    // console.log(loggedIn);
    
    if (!loggedIn) {
        return <Navigate to="/login" />
    }
    
    return children;

};

export default ProtectedRoute;