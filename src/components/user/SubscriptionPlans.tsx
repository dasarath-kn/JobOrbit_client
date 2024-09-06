import { useEffect, useState } from 'react';
import { subscriptedUser, subscription } from '../../Interface/AdminInterface';
import { getSubscriptionplans, subscribeduserdetails, subscriptionPayment } from '../../Api/userApi';
import { loadStripe } from '@stripe/stripe-js';


const SubscriptionPlans = () => {
  const [skelton, setSkelton] = useState<boolean>(true)

  const [plans, setPlans] = useState<subscription[]>([])
  const [subscribeduser, setSubscribeduser] = useState<subscriptedUser>()

  useEffect(() => {
    const subscriptions = async () => {
      try {
        let response = await getSubscriptionplans()
        if (response?.data) {
          setPlans(response.data.subscriptionplan)
        }
      } catch (error) {
        console.error(error);

      }
    }
    const subscribeduser = async () => {
      try {
        let response = await subscribeduserdetails()
        if (response?.data) {
          setSubscribeduser(response.data.subscribedUser)
        }
      } catch (error) {
        console.error(error);

      }
    }
    subscriptions()
    subscribeduser()

  }, [])


  const handleSubscription = async (_id: string, month: number) => {
    try {

      const public_key = import.meta.env.VITE_STRIPE_PUBLISHED_KEY
      const stripe = await loadStripe(public_key)

      const sessionResponse = await subscriptionPayment(_id, month)
      const sessionId = sessionResponse?.data.payment_id
      stripe?.redirectToCheckout({
        sessionId: sessionId
      })

    } catch (error) {
      console.error(error);

    }
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setSkelton(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])
  return (
<div className='min-h-screen flex flex-col items-center mb-4  bg-gray-50'>
  <div className='w-full'>
    <div className='w-full mt-14 '>
      <p className='text-center font-bold text-3xl'>Choose Your Subscription Plan</p>
    </div>
    <div className='w-full flex justify-center items-center lg:mt-14'>
      <div className='grid  w-11/12 lg:w-4/5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 mt-10 items-center justify-center'>
        {plans && plans.length > 0 ? plans.map((val) => {
          return !skelton ? (
            <div
              key={val._id}
              className="hover:shadow-xl w-full sm:w-3/4 md:w-11/12 lg:w-3/4 transition duration-300 ease-in-out transform hover:scale-105 bg-white border-2 flex flex-col items-center rounded-2xl h-96"
            >
              <ul className="space-y-6 font-bold text-xl text-center mt-9 text-black">
                <li className="font-extrabold text-3xl text-gray-800">{val.subscriptiontype}</li>
                <li className="text-gray-600">${val.price}</li>
                <li>{val.month} Months</li>
                <li>Apply daily {val.limit} jobs</li>
                {subscribeduser?.plan_id._id === val._id && subscribeduser?.payment_status ? (
                  <button
                    disabled
                    className="bg-yellow-400 text-white rounded-3xl w-32 h-11"
                  >
                    Subscribed
                  </button>
                ) : (
                  <button
                    disabled={!!subscribeduser?.plan_id._id}
                    onClick={() => handleSubscription(val._id, val.month as number)}
                    className={`${
                      !!subscribeduser?.plan_id._id ? 'bg-gray-300 text-gray-500' : 'bg-black text-white'
                    } rounded-3xl w-32 h-11 transition duration-300 ease-in-out hover:bg-gray-800`}
                  >
                    Buy now
                  </button>
                )}
              </ul>
            </div>
          ) : (
            <div className="w-full h-96 border-2 flex flex-col items-center rounded-2xl bg-gray-100">
              <div className="animate-pulse flex flex-col items-center space-y-8 mt-9 w-full h-full">
                <div className="h-10 bg-slate-200 rounded w-3/4"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                <div className="h-8 bg-slate-200 rounded w-2/3"></div>
                <div className="h-11 bg-slate-200 rounded-3xl w-32"></div>
              </div>
            </div>
          )
        }) : (
          <div className="flex w-full min-h-screen justify-center">
            <div className="w-1/2 h-96 flex flex-col justify-center items-center">
              <p className="text-black font-semibold text-2xl text-center">No Subscription Plan Found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


  );
}

export default SubscriptionPlans;
