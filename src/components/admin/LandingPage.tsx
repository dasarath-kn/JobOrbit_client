import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { IoNotificationsSharp } from 'react-icons/io5'

const LandingPage = () => {
  return (
    <>
    <div className='flex lg:justify-evenly '>
        
        <div className='lg:h-full h-full  w-1/6 ' style={{backgroundColor:'#48126A'}}>

    <span className='font-bold pl-5 pt-11 text-4xl text-white underline flex justify-center'>Admin</span>
    <div className='flex flex-col text-white mt-20 pl-5 space-x-3 text-2xl flex justify-center items-center'>
        <ul className='space-y-8 '>
            <li>
                <a href="">
                    Dashboard
                </a>
            </li>
           
            <li>
                <a href="">
                    Users
                </a>
            </li>
           
            <li>
                <a href="">
                    Subscriptions
                </a>
            </li>
           
            <li>
                <a href="">
                    Companies
                </a>
            </li>
            <li>
                <a href="">
                    Jobs
                </a>
            </li>
            <li>
                <a href="">
                    Category
                </a>
            </li>
           
        </ul>
    </div>

        </div>
        <div className='w-full h-28 border-4 flex justify-evenly items-center '>
            <div className=' w-1/2 h-14 r flex flex-row justify-center items-center  '>
            <input type="text" className='text-black w-2/3 h-14  text-xl text-center    border' placeholder='Serach'  />
            <FaSearch className=' text-gray-600   w-11 h-9 ' />
            </div>
            <IoNotificationsSharp className='w-11 h-9  ' />
            <IoIosLogOut className='w-11 h-9 ' />


        </div>
    </div>
    </>
  )
}

export default LandingPage