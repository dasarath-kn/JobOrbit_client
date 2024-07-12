import React from 'react'
import Profile from '../../components/user/Profile'
import MainNav from '../../components/common/MainNav'
import Footer from '../../components/common/Footer'

const ProfilePage = () => {
  return (
    <>
    <div className='sticky top-0 z-50'>

    <MainNav/>
    </div>
    <Profile/>
    <Footer/>
    </>
  )
}

export default ProfilePage
