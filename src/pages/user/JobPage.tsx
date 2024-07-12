import React from 'react'
import NavBar from '../../components/company/NavBar'
import Footer from '../../components/common/Footer'
import Jobs from '../../components/user/Jobs'
import MainNav from '../../components/common/MainNav'

const JobPage = () => {
  return (
   <>
    <div className='sticky top-0 z-50'>
    <MainNav/>
        </div>
        <Jobs/>
        <Footer/>
   </>
  )
}

export default JobPage
