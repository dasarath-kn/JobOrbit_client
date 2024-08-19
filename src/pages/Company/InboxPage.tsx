import React from 'react'
import NavBar from '../../components/company/NavBar'
import Inbox from '../../components/company/Inbox'
import Footer from '../../components/common/Footer'

const InboxPage = () => {
  return (
   <>
       <div className='sticky top-0 z-50'>
    <NavBar/>
        </div>
        <Inbox/>
        <Footer/>
   </>
  )
}

export default InboxPage