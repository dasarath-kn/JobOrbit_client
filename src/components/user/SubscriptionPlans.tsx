import { useEffect, useState } from 'react';
import { subscriptedUser, subscription } from '../../Interface/AdminInterface';
import { getSubscriptionplans, subscribeduserdetails, subscriptionPayment } from '../../Api/userApi';
import { loadStripe } from '@stripe/stripe-js';
import { Check, Sparkles } from 'lucide-react';


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
  <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
          Choose Your Plan
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Select the perfect subscription plan tailored to your needs
        </p>
      </div>

      <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="relative rounded-2xl border-2 border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 bg-white hover:shadow-2xl"
          >
            {skelton ? (
              <div className="p-8 h-full">
                <div className="animate-pulse space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-full w-2/3 mx-auto"></div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                {plan.subscriptiontype === 'Pro' && (
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-black">{plan.subscriptiontype}</h3>
                  <div className="mt-4 flex justify-center">
                    <span className="px-3 text-5xl font-extrabold text-black">${plan.price}</span>
                    <span className="text-xl font-medium text-gray-600 self-end mb-1">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{plan.month} month subscription</p>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-black" />
                    <span className="ml-3 text-gray-800">Up to {plan.limit} job applications daily</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-black" />
                    <span className="ml-3 text-gray-800">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-black" />
                    <span className="ml-3 text-gray-800">Advanced analytics</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => handleSubscription(plan._id, plan.month as number)}
                    disabled={!!subscribeduser?.plan_id._id}
                    className={`w-full rounded-full py-3 px-6 text-center text-white text-lg font-semibold transition-all duration-200 ${
                      subscribeduser?.plan_id._id === plan._id && subscribeduser?.payment_status
                        ? 'bg-green-500 cursor-default'
                        : subscribeduser?.plan_id._id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-900'
                    }`}
                  >
                    {subscribeduser?.plan_id._id === plan._id && subscribeduser?.payment_status
                      ? 'Current Plan'
                      : subscribeduser?.plan_id._id
                      ? 'Unavailable'
                      : 'Get Started'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="flex justify-center items-center mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-black">No Subscription Plans Available</h3>
            <p className="mt-2 text-gray-600">Please check back later for available plans.</p>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default SubscriptionPlans;
