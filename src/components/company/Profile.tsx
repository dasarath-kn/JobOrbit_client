import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Profile = () => {

  return (
    <>
      <div className='w-screen h-screen flex  flex-col justify-center sm:justify-center sm:w-auto items-center  '>
        <div className='bg-black text-white flex flex-row s:w-auto lg:w-3/4 1/2 h-auto mt-20 rounded-2xl  '>
          <div className='lg:w-1/2 h-auto lg:content-center sm:w-1/2 sm:h-1/2  md:content-center'>

            <img src="/landingpage1.png " className='' alt="" />
          </div>
          <div className='border-7 ml-28 '>
            <ul className='space-y-6 '>
              <li className='text-2xl font-bold mt-8'>Codex Technologies</li>
              <li className='flex flex-row'> <FaMapMarkerAlt  />   : sdf </li>
              <li>Industry</li>
             
              <li>Address:</li>
              <li>About:</li>
              <li >Address:dssssssssssss</li>
              <li>Gmail:</li>
              <li>Phone:</li>
              <li>Website:</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
