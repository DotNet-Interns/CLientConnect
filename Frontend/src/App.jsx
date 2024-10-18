import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AddSR from './pages/AddSR';
import AddCustomer from './pages/AddCustomer';
import Navbar from './pages/Navbar';
import DisplayCustomer from './pages/DisplayCustomer';

function App() {

  return (
    <>
        <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/addSR' element={<AddSR />} />
        <Route path='/addCustomer' element={<AddCustomer />} />
        <Route path='/view/customer' element={<DisplayCustomer />} />
      </Routes>
    </>
  )
}

export default App
