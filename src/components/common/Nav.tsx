import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate()

  return (
    <>
      {/* <nav className="p-4 flex justify-between items-center bg-black">
        <a href="#" className="text-white font-medium text-lg">
          Joborbit
        </a>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div id="nav-menu" className={`lg:flex ${isOpen ? 'block' : 'hidden'} space-y-2 lg:space-y-0 lg:space-x-5 lg:items-center lg:flex-row flex-col`}>
          <a href="#" className="font-medium text-white">Home</a>
          <a href="#" className="font-medium text-white">Find job</a>
          <a href="#" className="font-medium text-white">About us</a>
          <button className="bg-white px-4 py-1 font-medium text-black rounded-xl flex justify-center items-center hover:bg-black hover:text-white hover:border">Register</button>
        </div>
      </nav> */}


      <nav className="bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:mx-36  p-8">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/joborbitLogo.png" className="w-40" alt="Flowbite Logo" />
            {/* <span className=" justify-start text-2xl font-semibold whitespace-nowrap dark:text-white">JObOrbit</span> */}
          </a>
          <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-black rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-whi rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Find JOb    </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About Us</a>
              </li>
              <li>
                <button className="bg-white px-4 py-1 font-medium text-black rounded-xl flex justify-center items-center hover:bg-black hover:text-white hover:border" onClick={() => { navigate('/signin') }}>Register</button>

              </li>



            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Nav;
