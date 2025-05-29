import React, { useState } from 'react'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import {Navigate, Route , Routes, useSearchParams} from "react-router" ; 
import  { Toaster } from 'react-hot-toast';
import Home from '../Pages/Home'

const App = () => {


  return (

    <>
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>} />
    </Routes>

    <Toaster/>
    </>


  )

}

export default App
