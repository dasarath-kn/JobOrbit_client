import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logoutCompany } from '../../Redux/CompanySlice';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modal,setModal]=useState(false)
    const navigate = useNavigate()
    const dispatch =useDispatch()
  const handlemodal =()=>{
    setModal(!modal)
  }
  const handleLogout =()=>{
    localStorage.removeItem("Companytoken")
    dispatch(logoutCompany())
    navigate('/')
  }
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
    <nav className="bg-black">
    <div className="max-w-screen-xl flex flex-wrap  justify-between  lg:mx-36 p-8">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
        <span className=" text-2xl font-semibold whitespace-nowrap  dark:text-white">JobOrbit</span>
      <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'}    w-full md:block md:w-auto`} id="navbar-default">
        <ul className="font-medium  flex flex-col p-4   md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
          <li onClick={()=>navigate('/company/post')}>
            Post          </li>
          <li className='text' onClick={()=>navigate('/company/job')}>
            JOb 
          </li>
          <li>
          Schedule
          </li>
          <li>
            Inbox
          </li>
          <li onClick={()=>navigate('/company/profile')}>
           Profile
          </li>
          <li  className='' id="dropdownDefaultButton" onClick={handlemodal} data-dropdown-toggle="dropdown">
                <img src="/user06.png" className='rounded-lg  w-9  ' alt="" />
          {modal &&
<div id="dropdown" aria-hidden="true" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-400">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
      </li>
     
    </ul>
</div>}
                
          </li>
          <li>
          <IoIosNotificationsOutline className='text-white w-11 h-8' />
          </li>



        </ul>
      </div>
    </div>
  </nav>
  



  </>
  

  )
}

export default NavBar