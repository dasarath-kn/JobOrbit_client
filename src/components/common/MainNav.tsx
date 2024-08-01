import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { User } from '../../Interface/UserInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { logoutUser } from '../../Redux/UserSlice';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<boolean>(false);
  const dispatch =useDispatch()

  const userDatas: User = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = () => {
    localStorage.removeItem("Usertoken")
    dispatch(logoutUser())
    navigate('/')
  }


  return (
    <nav className="bg-black">
      <div className="max-w-screen-xl flex flex-wrap justify-between lg:mx-36 p-8">
        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">JobOrbit</span>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
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
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 text-white md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className="md:ml-auto" onClick={() => navigate('/post')}>
              Post
            </li>
            <li onClick={() => navigate('/job')}>
              Find Job
            </li>
            <li onClick={() => navigate('/viewplan')}>
              Subscriptions
            </li>
            <li onClick={() => navigate('/connections')}>
              Connections
            </li>
            <li>
              About Us
            </li>
            <li className="relative">
              <div onClick={handleMenu}>
                {userDatas.img_url ? (
                  <img src={userDatas.img_url} className="rounded-full w-9 h-8" alt="" />
                ) : (
                  <img src="/user06.png" className="rounded-lg w-9 h-9" alt="" />
                )}
              </div>
              {menu && (
                <div className="absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg dark:text-white mt-2">
                  <button
                    data-modal-target="select-modal"
                    data-modal-toggle="select-modal"
                    type="button"
                    onClick={()=>navigate('/profile')}
                    className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-black text-black"
                  >
                    Profile
                  </button>
                  <button
                    data-modal-target="select-modal"
                    data-modal-toggle="select-modal"
                    type="button"
                    onClick={handleLogout}
                    className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-black text-black"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
            <li>
              <IoIosNotificationsOutline className="text-white w-11 h-8" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
