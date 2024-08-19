import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline, IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logoutCompany } from '../../Redux/CompanySlice';
import { RootState } from '../../Redux/Store';
import { MdVerified } from 'react-icons/md';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notification, setNotification] = useState<boolean>(false)

  const companyData = useSelector((state: RootState) => state.company)

  const handlemodal = () => {
    setModal(!modal)
  }
  const handleLogout = () => {
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
      <div className="w-full flex flex-wrap  justify-evenly  p-8">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
          <div className='lg:w-1/3 sm:w-1/2'>
            <span className=" text-2xl font-semibold whitespace-nowrap  dark:text-white">JobOrbit</span>
          </div>
          <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'}    w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium cursor-pointer  flex flex-col p-4   md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
              <li onClick={() => navigate('/company/post')}>
                Post          </li>
              <li className='text' onClick={() => navigate('/company/job')}>
                JOb
              </li>
              
              <li onClick={() => navigate('/company/inbox')}>
                Inbox
              </li>
              
              <li className='relative' id="dropdownDefaultButton" onClick={handlemodal} data-dropdown-toggle="dropdown">
                {companyData.img_url ? <img src={companyData.img_url} className='rounded-full  w-9  ' alt="" />
                  : <img src="/user06.png" className='rounded-lg  w-9  ' alt="" />
                }
                {modal &&
                  <div className="absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg dark:text-white mt-2">
                    <button
                      data-modal-target="select-modal"
                      data-modal-toggle="select-modal"
                      type="button"
                      onClick={() => navigate('/company/profile')}
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
                  </div>}

              </li>
              <li>
                <IoIosNotificationsOutline onClick={() => setNotification(!notification)} className='text-white w-11 h-8' />
                {notification && (
                  <div className="absolute right-80 w-96 min-h-20 max-h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 z-50 bg-white/80 border border-gray-200 rounded-lg dark:text-white mt-2">
                    <div className='m-4'>
                      <p className='text-gray-500 pb-4'>Connection Request</p>
                      <div className='flex flex-col space-y-4'>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>
                            <li>Dasarath</li>

                            <li className='flex flex-row justify-center items-center space-x-4'> <MdVerified className='text-green-500' />
                              <IoMdCloseCircle className='text-red-500' /></li>
                          </ul>
                        </div>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>
                            <li>Dasarath</li>

                            <li className='flex flex-row justify-center items-center space-x-4'> <MdVerified className='text-green-500' />
                              <IoMdCloseCircle className='text-red-500' /></li>
                          </ul>
                        </div>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>
                            <li>Dasarath</li>

                            <li className='flex flex-row justify-center items-center space-x-4'> <MdVerified className='text-green-500' />
                              <IoMdCloseCircle className='text-red-500' /></li>
                          </ul>
                        </div>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>
                            <li>Dasarath</li>

                            <li className='flex flex-row justify-center items-center space-x-4'> <MdVerified className='text-green-500' />
                              <IoMdCloseCircle className='text-red-500' /></li>
                          </ul>
                        </div>

                      </div>
                    </div>
                    <div className='m-4'>
                      <p className='text-gray-500 pb-4'>Interview  Scheduled</p>
                      <div className='flex flex-col space-y-4'>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>

                            <li>
                              <p>Codex technologies</p>
                              <p className='text-gray-500 font-normal text-sm break-words'>Interview scheduled for</p>
                            </li>


                          </ul>
                        </div>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>

                            <li>
                              <p>Codex technologies</p>
                              <p className='text-gray-500 font-normal text-sm break-words'>Interview scheduled for</p>
                            </li>


                          </ul>
                        </div>
                        <div className=''>
                          <ul className='font-medium text-xl text-black  flex flex-row justify-evenly'>
                            <li>
                              <img src="/user06.png" className='w-9 h-9' alt="" />
                            </li>

                            <li>
                              <p>Codex technologies</p>
                              <p className='text-gray-500 font-normal text-sm break-words'>Interview scheduled for</p>
                            </li>


                          </ul>
                        </div>




                      </div>
                    </div>
                  </div>
                )}
              </li>



            </ul>
          </div>
        </div>
      </nav>




    </>


  )
}

export default NavBar