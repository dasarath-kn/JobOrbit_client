import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { conversationData, notification, User } from '../../Interface/UserInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { logoutUser, setUserdetails } from '../../Redux/UserSlice';
import socket from '../../Config/Socket';
import {  conversation, getUserdata } from '../../Api/userApi';
import { FaCrown } from 'react-icons/fa';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false)
  const [notificationData, setNotificationData] = useState<notification[]>()
  const [userConversation, setUserConverstaion] = useState<conversationData[]>([])
  const dispatch = useDispatch()

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
  useEffect(() => {
    console.log("hello");

    socket.on('notification', ({ data }) => { 
      if (data[0].reciever_id == userDatas._id) {
        console.log(data);
        setNotificationData(data)


      }
    });

    return () => {
      socket.off('notification');
    };
  }, [socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationData([]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [notificationData]);
 
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await getUserdata()
        if (response?.data.success) {

          dispatch(setUserdetails(response?.data.userData))
        }

      } catch (error) {
        console.error(error);

      }
    }
    userData()

  }, [dispatch])

  useEffect(() => {
    const conversationData = async () => {
      try {
        let response = await conversation("user")
        if (response?.data.success) {
          setUserConverstaion(response.data.conversationData)

        }
      } catch (error) {
        console.error(error);

      }
    }
    conversationData()
  }, [])  
  return (
    <nav className="bg-black">
      <div className="w-full flex flex-wrap  justify-evenly items-center  p-8">
       <div className='lg:w-1/3 sm:w-1/2 '>
        <img src="/joborbitLogo.png" className='w-40  ' alt="" />

       </div>
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
          <ul className="font-medium flex flex-col p-4  text-white md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 cursor-pointer">
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
            <li onClick={() => navigate('/about')}>
              About Us
            </li>
            <li className="relative">
              <div onClick={handleMenu}>
                {userDatas.img_url ? (<>
                  {userDatas.plan_id ?
                    <div className="relative inline-block">
                      <img src={userDatas.img_url} className="rounded-full w-8 h-8" alt="User" />
                      <FaCrown className="text-yellow-500 w-6 h-6 absolute top-0  right-0 transform translate-x-1/2 -translate-y-1/2" />
                    </div> :
                    <img src={userDatas.img_url} className="rounded-full w-8 h-8" alt="User" />
                  }

                </>) : (<>
                  {userDatas.plan_id ? <div className="relative inline-block">
                    <img src="/user06.png" className="rounded-full w-8 h-8" alt="User" />
                    <FaCrown className="text-yellow-500 w-6 h-6 absolute top-0  right-0 transform translate-x-1/2 -translate-y-1/2" />
                  </div> :
                    <img src="/user06.png" className="rounded-lg w-9 h-9" alt="" />
                  }
                </>)}
              </div>
              {menu && (
                <div className="absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg dark:text-white mt-2">
                  <button
                    data-modal-target="select-modal"
                    data-modal-toggle="select-modal"
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-black text-black"
                  >
                    Profile
                  </button>
                  <button
                    data-modal-target="select-modal"
                    data-modal-toggle="select-modal"
                    type="button"
                    onClick={() => navigate('/inbox')}
                    className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-black text-black"
                  >
                    Inbox
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
              <IoIosNotificationsOutline onClick={() => setNotification(!notification)} className="text-white w-11 h-8  rounded-full" />
              {notification && (
                <div className="absolute right-80  w-80 min-h-20 max-h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 z-50 bg-white/80 border border-gray-200 rounded-lg dark:text-white mt-11">
                  <div className='m-4 h-full'>
                    <p className='text-gray-500 pb-4'>Online People</p>
                    <div className='flex flex-col space-y-4 h-full'>
                      {userConversation && userConversation.length > 0 ? (
                        userConversation.map((val, index) => (
                         val.reciever_id.online && (<>
                         <div key={index} className='h-full'>
                            <ul className='font-medium text-xl text-black flex flex-row items-center justify-evenly space-x-4'>
                              <li>
                                {!val.reciever_id.img_url ? (
                                  <img src="/user06.png" className='w-9 h-9 rounded-full' alt="User" />
                                ) : (
                                  <img src={val.reciever_id.img_url} className='w-9 h-9 rounded-full' alt="User" />
                                )}
                              </li>
                              <li className='flex-1'>
                               <p> {val.reciever_id.firstname}</p>
                               <p className='font-extralight text-sm text-green-500'> Online</p>
                              </li>
                             
                              <li className='flex flex-row justify-center items-center space-x-2'>
                               <button onClick={()=>navigate('/inbox')} className='font-normal text-sm bg-black text-white w-20 h-9 rounded-xl'>Message</button>
                              </li>
                              {/* <li className='font-light text-sm'>
                                {formatDistanceToNow(new Date(val.date), { addSuffix: true })}
                              </li> */}
                            </ul>
                          </div>
                          </>)

                        ))
                      ) : (
                        <div className='text-black '>
                          <p className='text-center font-medium'>Connection Requests not found</p>
                        </div>
                      )}




                    </div>
                  </div>

                </div>
              )}
            </li>
          </ul>
        </div>
        {notificationData && notificationData.length > 0 && (
          <div className="absolute right-40 w-80 h-auto mt-20 bg-green-200 scrollbar-thumb-gray-300 scrollbar-track-gray-100 z-50  border border-gray-200 rounded-lg dark:text-white ">
            <div className='m-4 text-black'>
              <p className='text-gray-500 pb-4 text-center'>New Connection Request</p>
              {notificationData.map((val) => {
                return (<> <div className='w-full h-full flex flex-row space-x-7 justify-center items-center '>
                  {val.sender_id.img_url ? <img src={val.sender_id.img_url} className='w-9 h-9 rounded-full' alt="" />
                    : <img src="/user06.png" className='w-9 h-9' alt="" />
                  }
                  <p>{val.sender_id.firstname}</p>

                </div>
                </>)
              })}
            </div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
