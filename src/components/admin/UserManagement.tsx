import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import Nav from './Nav';
import toast, { Toaster } from 'react-hot-toast'
import { getUsers, userBlockUnblock } from '../../Api/adminApi';
import { User } from '../../Interface/UserInterface';
import 'flowbite';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>([]);
    const [showmodal, setShowmodal] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);


    useEffect(() => {
        let Userdata = async () => {
            try {
                let response = await getUsers()
                let userData = response?.data.userDatas
                setUsers(userData)
            } catch (error) {
                console.error(error);

            }
        }
        Userdata()

    }, [users])
    const handlemodal = (user: User) => {
        setSelectedUser(user)
        setShowmodal(!showmodal)

    }
    const BlockUnblock = async (userid: string, status: string) => {
        let response = await userBlockUnblock(userid, status)
        toast.success(response?.data.message)
    }
    return (
        <>
            {/* <Nav/> */}
            <div className="flex flex-row">
                <Sidebar />
                <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">



                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-lg border-4 text-black">
                                <tr>
                                    <th scope="col" className="px-6 py-9">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-9">
                                        UserDetails
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Block/Unblock
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {users && users.map((val, index) => {
                                    return (<>

                                        <tr key={val._id} className=" text-black font-medium text-xl">

                                            <td className="px-6 py-6">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-6">
                                                {val.firstname}
                                            </td>
                                            <td className="px-6 py-6 ">
                                                <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="h-14 w-20 text-white rounded-xl" onClick={() => handlemodal(val)} style={{ backgroundColor: '#033431' }} type="button">
                                                    Details
                                                </button>

                                                {showmodal && selectedUser && (
                                                    <div
                                                        id="default-modal"
                                                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                                                        aria-hidden="true"
                                                    >
                                                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                        Userdetails
                                                                    </h3>
                                                                    <button type="button" onClick={() => handlemodal(val)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                </div>
                                                                <div className="p-4 md:p-5 space-y-4">
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        Firstname:{selectedUser.firstname}
                                                                    </p>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        Lastname:{selectedUser.lastname}
                                                                    </p>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        Email:{selectedUser.email}
                                                                    </p>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        PhoneNumber:{selectedUser.phonenumber}
                                                                    </p>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        Field:{selectedUser.field}
                                                                    </p>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        Location:{selectedUser.location}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                                    <button data-modal-hide="default-modal" onClick={() => handlemodal(val)} type="button" className="text-white bg-red-500 hover:bg-red-500    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>)}

                                            </td>
                                            <td className="px-6 py-6">
                                                {val.is_blocked ? "Blocked" : "Active"}
                                            </td>
                                            <td className="px-6 py-6">
                                                {val.is_blocked ?
                                                    <button className='h-14 w-20 text-white rounded-xl bg-green-500' onClick={() => BlockUnblock(val._id as string, "unblock")} >
                                                        UnBlock
                                                    </button> :
                                                    <button className='h-14 w-20 text-white rounded-xl bg-red-500' onClick={() => BlockUnblock(val._id as string, "block")} >
                                                        Block
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    </>)
                                })}



                            </tbody>
                        </table>
                    </div>

                </div>
                <Toaster position="top-right" reverseOrder={false} />

            </div>

        </>
    );
};

export default UserManagement;
