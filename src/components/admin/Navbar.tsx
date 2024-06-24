import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { IoNotificationsSharp } from 'react-icons/io5'

const Navbar = () => {
    let [status,setStatus] =useState(false)
    const toggleMenu=()=>{
        setStatus(!status)
    }
  return (
    <>
    {/* <div className='flex lg:justify-evenly '> */}
    <div className='flex  '>
    <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        <div className=' h-screen  w-1/6 ' style={{backgroundColor:'#48126A'}}>

    <span className='font-bold pl-5 pt-11 text-4xl text-white underline flex justify-center'>Admin</span>
    <div className='flex flex-col text-white mt-20 pl-5 space-x-3 text-2xl flex justify-center items-center'>
        <ul className='space-y-8 '>
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Dashboard
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold ' >
                <a href="">
                    Users
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Subscriptions
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Companies
                </a>
            </li>
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Jobs
                </a>
            </li>
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Category
                </a>
            </li>
           
        </ul>
    </div>

        </div>
        {/* <div className='w-full h-28 border-4 flex justify-evenly items-center '>
            <div className=' w-1/2 h-14 r flex flex-row justify-center items-center  '>
            <input type="text" className='text-black w-2/3 h-14  text-xl text-center    border' placeholder='Serach'  />
            <FaSearch className=' text-gray-600   w-11 h-9 ' />
            </div>
            <IoNotificationsSharp className='w-11 h-9  ' />
            <IoIosLogOut className='w-11 h-9 ' />

            
        </div> */}
    </div>
        
    </>
  )
}

export default Navbar