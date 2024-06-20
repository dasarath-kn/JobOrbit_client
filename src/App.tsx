import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/user/SignIn.tsx'
import Nav from './components/common/Nav.tsx'
import LandingPage from './components/user/LandingPage.tsx'
import Homepage from './pages/user/Homepage.tsx'
import UserRouter from './Routes/UserRouter.tsx'
import CompanyRouter from './Routes/CompanyRouter.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRouter />} />
          <Route path='/company/*' element={<CompanyRouter />} />
        </Routes>

      </BrowserRouter>
     



    </>

  )
}

export default App
