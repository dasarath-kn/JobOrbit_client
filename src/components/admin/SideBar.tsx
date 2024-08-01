import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setStatus(!status);
  };

  const handleLogout = () => {
    localStorage.removeItem('Admintoken');
    navigate('/admin/login');
  };

  return (
    <>
      <div className="flex w-full md:w-1/6">
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={status}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            status ? 'block' : 'hidden'
          } md:block h-auto min-h-screen w-full bg-gray-800 md:bg-gray-900`}
          style={{ backgroundColor: '#033431' }}
        >
          <span className="font-bold pl-5 pt-11 text-4xl text-white underline flex justify-center">
            Admin
          </span>
          <div className="flex flex-col text-white mt-20 pl-5 space-x-3 text-2xl justify-center items-center">
            <ul className="space-y-8">
              <li className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold">
                <a href="/admin/dashboard">Dashboard</a>
              </li>
              <li
                onClick={() => navigate('/admin/usermanagement')}
                className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold"
              >
                Users
              </li>
              <li
                onClick={() => navigate('/admin/subscriptionplans')}
                className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold"
              >
                Subscriptions Plans
              </li>
              <li
                onClick={() => navigate('/admin/companymanagement')}
                className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold"
              >
                Company
              </li>
              <li
                onClick={() => navigate('/admin/reportpost')}
                className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold"
              >
                Reported Posts
              </li>
              <li className="hover:rounded-xl hover:bg-white w-full hover:text-violet-800 hover:text-center hover:font-bold">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
