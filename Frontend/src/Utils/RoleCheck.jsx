import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useUserInfo } from '../Contexts/User';
import AdminDashBoard from '../pages/AdminDashBoard';
const server = import.meta.env.VITE_SERVER;

const RoleCheck = () => {
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    console.log(contextUser);

    if (contextUser?.role === 0) {
        return <AdminDashBoard />;
    } else if (contextUser?.role === 1) {
        return <h1>This is SR Dashboard</h1>;
    }

    return <h1>Reload the Website!!</h1>;
};

export { RoleCheck };