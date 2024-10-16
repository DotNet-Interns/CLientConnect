import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AddSR from './pages/AddSR';
import AddCustomer from './pages/AddCustomer';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<h1>Hello World</h1>}/>
        <Route path="/accounts/login" element={<Login />} />
        <Route path='/accounts/addSR' element={<AddSR />} />
        <Route path='/accounts/addCustomer' element={<AddCustomer />} />
      </Routes>
    </>
  )
}

export default App
