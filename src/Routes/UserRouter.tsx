import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
const SignIn =lazy(()=> import( '../components/common/SignIn'));
const LandingPage =lazy(()=> import( '../pages/user/LandingPage'));
const SignUp =lazy(()=>import('../components/user/SignUp'));
const Otp =lazy(()=>import('../components/common/Otp'));
import Loading from '../components/common/Loadings';
import UserLoginAuth from '../Authentication/User/UserLoginAuth';
import UserLogoutAuth from '../Authentication/User/UserLogoutAuth';
import Emailverify from '../components/common/Emailverify';
import ResetPassword from '../components/common/ResetPassword';
const ProfilePage =lazy(()=>import('../pages/user/ProfilePage'));
const JobPage =lazy(()=> import('../pages/user/JobPage'));
const JobDetailsPage =lazy(()=> import('../pages/user/JobDetailsPage'));
const SubscriptionPlanPage =lazy(()=> import('../pages/user/SubscriptionPlanPage'));
import Success from '../components/common/Success';
import DocumentViewer from '../components/common/DocumentViewer';
const AboutPage =lazy(()=> import('../pages/user/AboutPage'));
const InboxPage =lazy(()=> import('../pages/user/InboxPage'));
const ConnectionPage =lazy(()=> import('../pages/user/ConnectionPage'));
const CompanyProfilePage =lazy(()=> import('../pages/user/CompanyProfilePage'));
const ViewUsersprofilepage =lazy(()=>import('../pages/user/ViewUsersprofilepage'));
const Homepage = lazy(()=> import('../pages/user/HomePage'));
const UserRouter = () => {
    return (
        <>
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='' element={<UserLogoutAuth/>}>
                <Route path='/post' element={<Homepage/>} />
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/job' element={<JobPage/>}/>
                <Route path='/jobdetails' element={<JobDetailsPage/>}/>
                <Route path='/viewplan' element={<SubscriptionPlanPage/>}/>
                <Route path='/paymentsuccess' element={<Success/>}/>
                <Route path='/resume' element={<DocumentViewer/>}/>
                <Route path='/connections' element={<ConnectionPage/>}/>
                <Route path='/companyprofile' element={<CompanyProfilePage/>}/>
                <Route path='/userprofile' element={<ViewUsersprofilepage/>}/>
                <Route path='/inbox' element={<InboxPage/>}/>
                <Route path='/about' element={<AboutPage/>} />


                </Route>
                <Route path='' element={<UserLoginAuth/>} >
                <Route path='/otp' element={<Otp role={"User"}/>}/>
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/verify' element={<Emailverify role={"User"}/>} />
                <Route path='/resetpassword' element={<ResetPassword role={"User"}/>} />
                <Route path='/about' element={<AboutPage/>} />
                
                </Route>
            </Routes>
        </Suspense>

        </>
    )
}

export default UserRouter