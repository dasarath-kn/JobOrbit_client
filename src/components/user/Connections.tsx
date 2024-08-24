import React, { useEffect, useState } from 'react'
import {  connections, getCompanies, getUserdata, getUsers, inbox, manageConnection } from '../../Api/userApi'
import {  notification, User } from '../../Interface/UserInterface'
import { Company } from '../../Interface/CompanyInterface'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'
import toast, { Toaster } from 'react-hot-toast'
import { setUserdetails } from '../../Redux/UserSlice'
import socket from '../../Config/Socket'
import { FaSearch } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { formatDistanceToNow } from 'date-fns'
interface Notification {
    message: string;
}
const Connections = () => {
    const [userData, setUserData] = useState<User[]>([])
    const [companyData, setCompanyData] = useState<Company[]>([])
    const navigate = useNavigate()
    const userDatas: User = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const [updated, setUpdated] = useState<boolean>(false)
    const [searchUser, setSearchUser] = useState<string>('')
    const [searchCompany, setSearchCompany] = useState<string>('')
    const [searchUserData, setSearchUserData] = useState<User[]>([])
    const [searchCompanyData, setSearchCompanyData] = useState<Company[]>([])
    const [requestModal, setRequestModal] = useState<boolean>(false)
    const [connectionData, setConnectionData] = useState<notification[]>([])
    useEffect(() => {
        const user = async () => {
            try {
                const response = await getUsers()
                if (response?.data.success) {
                    let data = response.data.userDatas.filter((val: User) => val._id != userDatas._id)
                    setUserData(data)
                    setSearchUserData(data)
                }
            } catch (error) {
                console.error(error);

            }
        }
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

        const company = async () => {
            try {
                const response = await getCompanies()
                if (response?.data.success) {
                    setCompanyData(response?.data.companyDatas)
                    setSearchCompanyData(response?.data.companyDatas)
                }
            } catch (error) {
                console.error(error);

            }
        }
        user()
        company()
        userData()
    }, [dispatch, updated])
    useEffect(() => {
        const connection = async () => {
            try {
                const response = await connections()
                if (response?.data.success) {
                    setConnectionData(response.data.connectRequests)
                }
            } catch (error) {
                console.error(error);

            }
        }
        connection()
    }, [updated])


    useEffect(() => {
        const handleNotification = ({ message }: Notification) => {

            setUpdated(!updated)
            toast.success(message);
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, [socket]);
    const handleConnection = async (id: string) => {
        try {
            const mes = { user_id: userDatas._id, connection_id: id, message: "Connection Request" }

            socket.emit('notify', mes)
            setUpdated(!updated)
        } catch (error) {
            console.error(error);

        }
    }
    // const handleCompany = async (id: string) => {
    //     try {
    //         const data = {
    //             company_id: id
    //         }
    //         const response = await connectCompany(data as connection)
    //         if (response?.data.success) {
    //             setUpdated(!updated)
    //             navigate('/inbox')

    //         }
    //     } catch (error) {
    //         console.error(error);

    //     }
    // }
    const handleInbox = async (id: string,role:string) => {
        try {
            navigate('/inbox')
            const response = await inbox(id,role)
            if (response?.data.success) {
            }

        } catch (error) {
            console.error(error);

        }
    }
    const handleSearchUser = () => {
        const values = userData.filter((val) => { return val.firstname?.toLowerCase().startsWith(searchUser.toLowerCase()) })

        setUserData(values)
    }
    const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value
        setSearchUser(values)
        if (values == '') {
            setUserData(searchUserData)
        }
    }
    const handleSearchCompany = () => {
        const values = companyData.filter((val) => { return val.companyname?.toLowerCase().startsWith(searchCompany.toLowerCase()) })

        setCompanyData(values)
    }
    const handleCompanySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value
        setSearchCompany(values)
        if (values == '') {
            setCompanyData(searchCompanyData)
        }

    }
    const handleAccept = async (notification_id: string, connection_id: string, message: string) => {
        try {
          const connectionData = { connection_id: connection_id, notification_id: notification_id, message: message }
          const response = await manageConnection(connectionData)
          if (response?.data.success) {
            setUpdated(!updated)
          }
        } catch (error) {
          console.error(error);
    
        }
    }
    return (
        <>
          <div className='min-h-screen flex justify-center mb-9 px-4'>
    <div className='flex flex-col w-full max-w-screen-xl'>
        <div className='flex flex-col mt-9'>
            <p className='text-2xl font-semibold text-center'>People</p>
            <div className='w-full flex justify-center mt-5'>
                <div className='flex items-center justify-center border rounded-xl h-12 w-full sm:w-80 lg:w-96 px-4 mt-4 lg:mt-0'>
                    <FaSearch className='text-gray-400 mr-2' />
                    <input
                        value={searchUser}
                        className='flex-grow border-none focus:outline-none'
                        onChange={(e) => handleUserSearchChange(e)}
                        type="text"
                        placeholder='Search People'
                    />
                    <button
                        onClick={handleSearchUser}
                        className='bg-black text-white rounded-xl w-20 h-8 ml-2'>
                        Search
                    </button>
                </div>
            </div>
            <button onClick={() => setRequestModal(!requestModal)} className='mt-5 font-semibold'>Show Request</button>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-9 gap-x-6 gap-y-6 overflow-y-auto max-h-64'>
                {userData && userData.length > 0 ? userData.map((val) => {
                    const matchingConnections = userDatas.connections && userDatas.connections?.length > 0
                        ? userDatas.connections.filter((values) => values.connection_id?._id === val._id)
                        : [];

                    return (
                        <div key={val._id} className='w-full flex justify-between p-6 shadow-2xl items-center bg-gray-50 h-28'>
                            <div className='flex items-center'>
                                {val.img_url
                                    ? <img src={val.img_url} className='w-11 h-11 rounded-full' alt="" />
                                    : <img src="/user06.png" className='w-11 h-11 rounded-full' alt="" />}
                                <div className='ml-4'>
                                    <p
                                        onClick={() => navigate('/userprofile', { state: { id: val._id } })}
                                        className='font-semibold text-xl'>
                                        {val.firstname}
                                    </p>
                                    <p className='text-gray-700'>{val.field}</p>
                                </div>
                            </div>
                            {matchingConnections.length > 0 ? (
                                matchingConnections[0].status ? (
                                    <button
                                        onClick={() => handleInbox(val._id as string,"user")}
                                        className='bg-black text-white rounded-xl h-11 w-20'>
                                        Message
                                    </button>
                                ) : (
                                    <button className='bg-black text-white rounded-xl h-11 w-20'>Pending</button>
                                )
                            ) : (
                                <button
                                    onClick={() => handleConnection(val._id as string)}
                                    className='bg-black text-white rounded-xl h-11 w-20'>
                                    Connect
                                </button>
                            )}
                        </div>
                    );
                }) : (
                    <div className='w-full justify-center '>

                        <p className='text-center'>No People found</p>
                    </div>
                )}
            </div>
        </div>

        <div className='flex flex-col mt-12'>
            <p className='text-2xl font-semibold text-center'>Companies</p>
            <div className='w-full flex justify-center mt-5'>
                <div className='flex items-center justify-center border rounded-xl h-12 w-full sm:w-80 lg:w-96 px-4 mt-4 lg:mt-0'>
                    <FaSearch className='text-gray-400 mr-2' />
                    <input
                        value={searchCompany}
                        className='flex-grow border-none focus:outline-none'
                        onChange={(e) => handleCompanySearchChange(e)}
                        type="text"
                        placeholder='Search Companies'
                    />
                    <button
                        onClick={handleSearchCompany}
                        className='bg-black text-white rounded-xl w-20 h-8 ml-2'>
                        Search
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-9 gap-x-6 gap-y-6 overflow-y-auto max-h-64'>
                {companyData && companyData.length > 0 ? companyData.map((val) => {
                    return (
                        <div key={val._id} className='w-full flex justify-between p-6 shadow-2xl items-center bg-gray-50 h-28'>
                            <div className='flex items-center'>
                                {val.img_url
                                    ? <img src={val.img_url} className='w-11 h-11 rounded-full' alt="" />
                                    : <img src="/user06.png" className='w-11 h-11 rounded-full' alt="" />}
                                <div className='ml-4'>
                                    <p
                                        onClick={() => navigate('/companyprofile', { state: { id: val._id } })}
                                        className='font-semibold text-xl break-words line-clamp-2 overflow-hidden'>
                                        {val.companyname}
                                    </p>
                                    <p className='text-gray-700'>{val.industry}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleInbox(val._id as string,"company")}
                                className='bg-black text-white rounded-xl h-11 w-20'>
                                Message
                            </button>
                        </div>
                    );
                }) : (
                    <p className='text-center'>No Companies Found</p>
                )}
            </div>
        </div>
    </div>

    <Toaster position="top-center" reverseOrder={false} />
    
    {requestModal && (
        <div id="popup-modal" className="fixed inset-0 bg-gray-700/50 z-50 flex justify-center items-center px-4">
            <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[90%] p-4 bg-white rounded-lg shadow">
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                    onClick={() => setRequestModal(!requestModal)}
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 space-y-7 overflow-y-auto max-h-[80vh]">
                    <h3 className="mb-5 font-semibold text-black text-2xl text-center">Connection Request</h3>
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-1 gap-4'>
                            {connectionData && connectionData.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6'>
                                    {connectionData.map((val, index) => (
                                        <div key={index} className='flex items-center p-4 border rounded-lg bg-gray-50'>
                                            <img src={val.sender_id.img_url || "/user06.png"} className='w-9 h-9 rounded-full' alt="User" />
                                            <div className='ml-4 flex-1'>
                                                <p className='font-medium'>{val.sender_id.firstname}</p>
                                                <p className='text-gray-500 text-sm'>{formatDistanceToNow(new Date(val.date), { addSuffix: true })}</p>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <MdVerified onClick={() => handleAccept(val._id, val.sender_id._id as string, "accept")} className='text-green-500 cursor-pointer' />
                                                <IoMdCloseCircle onClick={() => handleAccept(val._id, val.sender_id._id as string, "reject")} className='text-red-500 cursor-pointer' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-center font-medium'>Connection Requests not found</p>
                            )}
                        </div>
                    </div>
                    <button onClick={() => setRequestModal(!requestModal)} className='bg-black text-white w-full sm:w-24 h-10 rounded-lg mt-4'>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )}
</div>

        </>
    )
}

export default Connections