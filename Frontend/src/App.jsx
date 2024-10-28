import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AddSR from './pages/AddSR';
import AddCustomer from './pages/AddCustomer';
import DisplayCustomer from './pages/DisplayCustomer';
import RoleCheck from './Utils/RoleCheck';
import ProtectedRoute from './Utils/ProtectedRoute';
import AdminDashBoard from './pages/AdminDashBoard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={
          // <ProtectedRoute>
          //   <RoleCheck>

          //   </RoleCheck>
          // </ProtectedRoute>
          <AdminDashBoard />
        } />

        <Route path="/login" element={<Login />} />
        <Route path='/addSR' element={<AddSR />} />
        <Route path='/addCustomer' element={<AddCustomer />} />
        <Route path='/view/customer' element={<DisplayCustomer />} />
      </Routes>
    </>
  )
}

export default App
