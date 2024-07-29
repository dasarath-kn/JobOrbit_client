import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useFormik } from 'formik';
import { deletePlan, getSubscriptionplans, subscriptions, unlistandList } from '../../Api/adminApi';
import { subscription } from '../../Interface/AdminInterface';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';


const SubscriptionPlans = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [plans, setPlans] = useState<subscription[]>([]);
const [updated,setUpdated] =useState<boolean>(false)
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      subscriptiontype: '',
      price: '',
      month: '',
      limit: ''
    },
    onSubmit: async (data,{resetForm}) => {
      let response = await subscriptions(data);
      if (response?.data.success) {
        console.log(response.data.success);
        setUpdated(!updated)
        setOpenModal(!openModal)
        resetForm();
      }
    }
  });

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
    try {
      let response = await getSubscriptionplans();
      setPlans(response?.data.subscriptionplan);
     
    } catch (error) {
      console.error(error);
    }
  };
    fetchSubscriptionPlans();
    
  }, [updated]);
  console.log(plans,"pppppppp");
  
  
  const handleDeleteplan = async(id:string)=>{
    try {
      let response = await deletePlan(id)
      if(response?.data){
        setUpdated(!updated)        
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error(error);

    }
  }

  const handleListunlist = async(id:string,message:string)=>{
    try {
      let response = await unlistandList(id,message)
      if(response?.data){
        setUpdated(!updated)        

        toast.success(response.data.message)
      }
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-4">
          <button onClick={() => setOpenModal(!openModal)} className='text-blue-800 text-xl font-medium mb-4'>Add plans</button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div key={index} className="p-6 m-2 flex-col space-y-3 sm:w-full lg:w-[500px] h-72 rounded-md border shadow-xl">
                <div className='flex justify-end'>
                {/* <MdEdit className='w-5 h-5'/>       */}
                <MdDelete onClick={()=>handleDeleteplan(plan._id)} className='w-5 h-5'/>
                          </div>
                <h2 className="font-semibold text-2xl">{plan.subscriptiontype}</h2>
                <p className='font-medium'>${plan.price}</p>
                <div className="flex items-center text-gray-400">
                  {/* <FaMapMarkerAlt /> */}
                  <p className=" text-black">{plan.month} Months plan</p>
                </div>
                <p className='font-medium'>Daily user can apply {plan.limit} jobs</p>
                <div className='flex flex-row space-x-4'>
                  {/* <button className="rounded-xl my-3 bg-black text-white w-20 h-11">View</button> */}
                  {plan.unlist? <button onClick={()=>handleListunlist(plan._id,"list")} className="rounded-xl my-3 bg-green-500 text-white w-20 h-11">List</button>:
                  <button onClick={()=>handleListunlist(plan ?._id,"unlist")} className="rounded-xl my-3 bg-red-500 text-white w-20 h-11">Unlist</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
      </div>
      {openModal && (
        <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold dark:text-black">Add Subscription plan</h3>
                <button onClick={() => setOpenModal(!openModal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Subscription Type </label>
                    <input type="text"
                      required
                      onChange={handleChange}
                      value={values.subscriptiontype}
                      name="subscriptiontype"
                      id="subscriptiontype"
                      className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter subscription type"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Price</label>
                    <input
                      required
                      type="number"
                      onChange={handleChange}
                      value={values.price}
                      name="price"
                      id="price"
                      className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Month</label>
                    <input
                      required
                      type="number"
                      onChange={handleChange}
                      value={values.month}
                      name="month"
                      id="month"
                      className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter month count"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Limit</label>
                    <input
                      required
                      type="number"
                      onChange={handleChange}
                      value={values.limit}
                      name="limit"
                      id="limit"
                      className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter limit count"
                    />
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Submit
                </button>
              </form>
            </div>
          </div>
         
        </div>
      )}
    </>
  );
}

export default SubscriptionPlans;
