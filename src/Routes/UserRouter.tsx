import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../components/user/SignIn'
import Homepage from '../pages/user/Homepage';
import SignUp from '../components/user/SignUp';
const UserRouter = () => {
    console.log("hello");

    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp role='User' />} />
            </Routes>

        </>
    )
}

export default UserRouter