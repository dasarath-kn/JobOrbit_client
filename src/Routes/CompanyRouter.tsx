import React,{Suspense,lazy} from 'react'
import { Routes,Route } from 'react-router-dom'
const Homepage =lazy(()=> import( '../pages/user/LandingPage'));
const SignIn = lazy(()=> import( '../components/user/SignIn'));
const SignUp = lazy(()=> import( '../components/company/SignUp'));
const Otp =lazy(()=> import('../components/company/Otp'));
import Loading from '../components/common/Loadings'
const CompanyRouter = () => {
  return (
    <>
    <Suspense fallback={<Loading/>} >
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signin' element={<SignIn role={"Company"}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<Otp/>}/>
    </Routes>
    </Suspense>

    </>
  )
}

export default CompanyRouter