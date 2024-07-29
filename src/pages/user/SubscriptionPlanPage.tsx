import React from 'react'
import MainNav from '../../components/common/MainNav'
import SubscriptionPlans from '../../components/user/SubscriptionPlans'
import Footer from '../../components/common/Footer'

const SubscriptionPlanPage = () => {
  return (
   <>
    <div className='sticky top-0 z-50'>
    <MainNav/>
    <SubscriptionPlans/>
    <Footer/>
    </div>
   </>
  )
}

export default SubscriptionPlanPage