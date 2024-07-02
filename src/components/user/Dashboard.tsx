import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-row'>
        <div className='flex flex-col items-center border-8 mt-40 w-80 ml-14 h-96 rounded-2xl shadow-2xl'>
    <ul className='mt-5'>
    <li>
      <img src="public/landingpage2.png" className='w-20 rounded-xl hover:' alt="" />  
    </li>
    <li className='font-semibold text-2xl' >Dasarath</li>
    <li className='text-gray-500'>View Profile</li>
    </ul>
        <div className='mt-4 text-xl font-medium'>
           <ul className='space-y-5 '>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center' >Posts</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Jobs</li>
            <li className='hover:bg-black rounded-xl w-24  hover:text-white hover:text-center'>Network</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Inbox</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Saved</li>
            </ul> 
        </div>
        </div>
    </div>
  )
}
    
export default Dashboard
