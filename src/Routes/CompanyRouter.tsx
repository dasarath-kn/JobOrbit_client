import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from '../pages/user/Homepage'
import SignIn from '../components/user/SignIn'
import SignUp from '../components/user/SignUp'
const CompanyRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signin' element={<SignIn role={"Company"}/>}/>
        <Route path='/signup' element={<SignUp role={"Company"}/>}/>
    </Routes>

    </>
  )
}

export default CompanyRouter