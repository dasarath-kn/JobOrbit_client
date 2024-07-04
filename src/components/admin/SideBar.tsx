import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    let [status,setStatus] =useState(false)
    const toggleMenu=()=>{
        setStatus(!status)
    }
    const navigate = useNavigate()
    const handlelogout =()=>{
        localStorage.removeItem("Admintoken")
        navigate('/admin/login')   
    }
  return (
    <>
    <div className='flex  w-1/6 '>
    <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        <div className=' h-screen  w-full ' style={{backgroundColor:'#033431'}}>

    <span className='font-bold pl-5 pt-11 text-4xl text-white underline flex justify-center'>Admin</span>
    <div className='flex flex-col text-white mt-20 pl-5 space-x-3 text-2xl  justify-center items-center'>
        <ul className='space-y-8 '>
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="/admin/dashboard">
                    Dashboard
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold ' >
                <a href="/admin/usermanagement">
                    Users
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="">
                    Subscriptions
                </a>
            </li>
           
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a href="/admin/companymanagement">
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
            <li className='hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold '>
                <a onClick={handlelogout}>
                    Logout
                </a>
            </li>
           
        </ul>
    </div>

        </div>
        
      
    </div>
        
    </>
  )
}

export default SideBar