import React from 'react'
import Login from './pages/Login'
import Otp from './pages/Otp'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import { Route,Routes } from 'react-router-dom';
import Header from './component/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
import './App.css';

function App() {
  return (
   <>
      <Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/user/otp' element={<Otp/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
   </>

  )
}

export default App