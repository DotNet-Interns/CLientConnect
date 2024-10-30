import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AddSR from './pages/AddSR';
import AddCustomer from './pages/AddCustomer';
import DisplayCustomer from './pages/DisplayCustomer';
import { RoleCheck } from './Utils/RoleCheck';
import ProtectedRoute from './Utils/ProtectedRoute';
import AdminDashBoard from './pages/AdminDashBoard';
import Navbar from './Components/Navbar';
import { useUserInfo } from './Contexts/User';
import { getCookie } from './Utils/cookie';
import axios from 'axios';
import Customers from './pages/Customers';
import Users from './pages/Users';
const server = import.meta.env.VITE_SERVER;
// import AdminDashBoard from './pages/AdminDashBoard';

function App() {
  const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
  console.log(contextUser);
  
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const Auth_Token = getCookie("Auth_Token");
        const response = await axios.get(`${server}/get`,
          {
            headers: {
              Authorization: `Bearer ${Auth_Token}`
            }
          }
        )
        // console.log(response.data);
        setContextUser(response.data)
        setLoggedIn(true)
        setLoading(false)

      } catch (error) {
        console.log(error);

      }
    }
    getUser();
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <RoleCheck />
          </ProtectedRoute>

        } />
        <Route path="/login" element={<Login />} />
        <Route path='/addSR' element={<AddSR />} />
        <Route path='/addCustomer' element={<AddCustomer />} />
        <Route path='/view/customer/:cid' element={<ProtectedRoute><DisplayCustomer /></ProtectedRoute>} />
        <Route path='/customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path='/srList' element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Routes>


    </>
  )
}

export default App
