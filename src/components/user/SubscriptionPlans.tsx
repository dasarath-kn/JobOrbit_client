import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { subscriptedUser, subscription } from '../../Interface/AdminInterface';
import { getSubscriptionplans, subscribeduserdetails, subscriptionPayment } from '../../Api/userApi';
import { loadStripe } from '@stripe/stripe-js';

const SubscriptionPlans = () => {
    const [plans,setPlans]=useState<subscription>()
    const [subscribeduser,setSubscribeduser]=useState<subscriptedUser>()
    useEffect(()=>{
         const subscriptions =async()=>{
            try {
                let response =await getSubscriptionplans()
                if(response?.data){
                    setPlans(response.data.subscriptionplan)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        const subscribeduser =async()=>{
          try {
            let response = await subscribeduserdetails()
            if(response?.data){
              setSubscribeduser(response.data.subscribedUser)
            }
          } catch (error) {
            console.error(error);
            
          }
        }
        subscriptions()
        subscribeduser()
        
    },[])
    

    const handleSubscription =async(_id:string)=>{
      try {
      
        const public_key = import.meta.env.VITE_STRIPE_PUBLISHED_KEY
        console.log(public_key);
        
        const stripe = await loadStripe(public_key)
        
        const sessionResponse = await subscriptionPayment({price:_id})
        console.log(sessionResponse?.data,"ll");
        
        const sessionId =sessionResponse?.data.payment_id
        const result = stripe?.redirectToCheckout({
          sessionId:sessionId
        })
        
      } catch (error) {
        console.error(error);
        
      }
    }
    console.log(subscribeduser);
    
  return (
    <div className='  min-h-screen'>
     <div className='w-full mt-14'>

      <p className='text-center font-bold text-3xl'>Choose Your Subscription Plan</p>
     </div>
      <div className='grid lg:grid-cols-3  mb-16  md:grid-cols-2 sm:grid-cols-1 sm:w-full  justify-center '>
       
        {plans&& plans.length>0?plans.map((val)=>{
           return (<>
           
        <div key={val._id} className='sm:w-full   lg:w-2/3 h-96 mt-8 lg:ml-36 lg:mt-36 border-2 flex flex-col items-center rounded-2xl bg-gray-100 '>
  {/* {subscribeduser?.plan_id._id ==val._id && subscribeduser?.payment_status && 
  <div className='w-full h-auto flex justify-end'>

  <p className='text-yellow-500 '>Subcribed plan </p>
  </div>
  } */}
          <ul  className='space-y-8 font-bold text-xl text-center mt-9 text-black'>
            <li className='font-extrabold text-3xl '>{val.subscriptiontype}</li>
            <li>₹ {val.price}</li>
            <li>{val.month} Months</li>
            <li>Apply daily {val.limit} jobs</li>
            {subscribeduser?.plan_id._id ==val._id && subscribeduser?.payment_status? 
            <button  className=' text-yellow-400 rounded-3xl w-32 h-11'>Subscribed</button>:

            <button onClick={()=>handleSubscription(val._id)} className='bg-black text-white rounded-3xl w-32 h-11'>Buy now</button>
            }</ul>
        </div>
        </>)
        }):
        <div className='flex items-center'>
            <p className='text-black font-bold text-3xl'>Subscription plans not found</p>
        </div>
}
       
      </div>
    </div>
  );
}

export default SubscriptionPlans;
