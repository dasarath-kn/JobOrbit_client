import  { useEffect, useState } from 'react';
import { subscriptedUser, subscription } from '../../Interface/AdminInterface';
import { getSubscriptionplans, subscribeduserdetails, subscriptionPayment } from '../../Api/userApi';
import { loadStripe } from '@stripe/stripe-js';


const SubscriptionPlans = () => {
    const [plans,setPlans]=useState<subscription[]>([])
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
    

    const handleSubscription =async(_id:string,month:number)=>{
      try {
      
        const public_key = import.meta.env.VITE_STRIPE_PUBLISHED_KEY        
        const stripe = await loadStripe(public_key)
        
        const sessionResponse = await subscriptionPayment(_id,month)        
        const sessionId =sessionResponse?.data.payment_id
         stripe?.redirectToCheckout({
          sessionId:sessionId
        })
        
      } catch (error) {
        console.error(error);
        
      }
    }
    
  return (
    <div className='  min-h-screen'>
     <div className='w-full mt-14'>

      <p className='text-center font-bold text-3xl'>Choose Your Subscription Plan</p>
     </div>
      <div className='grid lg:grid-cols-3  mb-16  md:grid-cols-2 sm:grid-cols-1 sm:w-full  justify-center '>
       
        {plans&& plans.length>0?plans.map((val)=>{
           return (<>
           
           <div
  key={val._id}
  className="sm:w-full lg:w-2/3 h-96 mt-8 lg:ml-36 lg:mt-36 border-2 flex flex-col items-center rounded-2xl bg-gray-100"
>
  <ul className="space-y-8 font-bold text-xl text-center mt-9 text-black">
    <li className="font-extrabold text-3xl">{val.subscriptiontype}</li>
    <li>₹ {val.price}</li>
    <li>{val.month} Months</li>
    <li>Apply daily {val.limit} jobs</li>
    {subscribeduser?.plan_id._id === val._id && subscribeduser?.payment_status ? (
      <button
        disabled
        className="text-yellow-400 rounded-3xl w-32 h-11"
      >
        Subscribed
      </button>
    ) : (
      <button
        disabled={!!subscribeduser?.plan_id._id} // Disable if any plan is subscribed
        onClick={() => handleSubscription(val._id, val.month as number)}
        className={`${
          !!subscribeduser?.plan_id._id ? 'bg-gray-300 text-gray-500' : 'bg-black text-white'
        } rounded-3xl w-32 h-11`}
      >
        Buy now
      </button>
    )}
  </ul>
</div>

        </>)
        }):
        <div className="flex w-full lg:ml-96 ml-0 min-h-screen justify-center ">
        <div className="w-1/2  h-96 flex flex-col justify-center ml-11  items-center">
          <p className="text-black font-semibold text-2xl text-center">No Subscription Plan Found</p>
        </div>
      </div>
      
}
       
      </div>
    </div>
  );
}

export default SubscriptionPlans;
