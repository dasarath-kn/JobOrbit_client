import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const navigate = useNavigate()
  return (
    <nav className="bg-black">
    <div className="max-w-screen-xl flex flex-wrap  justify-between  lg:mx-36 p-8">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
        <span className=" text-2xl font-semibold whitespace-nowrap  dark:text-white">JObOrbit</span>
      <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'}    w-full md:block md:w-auto`} id="navbar-default">
        <ul className="font-medium  flex flex-col p-4   md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
          <li>
            <a href='/' className="block py-2 px-3 text-white bg-black rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white" aria-current="page">Post</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-whi rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> JOb    </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-whi rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Schedule    </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inbox</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
          </li>
          <li  className=''>
                <img src="public/landingpage2.png" className='rounded-lg  w-14 ' alt="" />
          </li>
          <li>
          <IoIosNotificationsOutline className='text-white w-11 h-8' />
          </li>



        </ul>
      </div>
    </div>
  </nav>

  )
}

export default NavBar