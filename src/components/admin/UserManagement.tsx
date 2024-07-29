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
    const [block, setBlock] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [pagecount, setPagecount] = useState<number>(0)



    useEffect(() => {
        let Userdata = async () => {
            try {
                let response = await getUsers(page)
                let userData = response?.data.userDatas
                setUsers(userData)
                setPagecount(response?.data.count)
            } catch (error) {
                console.error(error);

            }
        }
        Userdata()

    }, [block, page])
    const handlemodal = (user: User) => {
        setSelectedUser(user)
        setShowmodal(!showmodal)

    }
    const BlockUnblock = async (userid: string, status: string) => {
        let response = await userBlockUnblock(userid, status)
        toast.success(response?.data.message)
    }
    const handleConfirm = (val: User) => {
        setConfirm(!confirm)
        setSelectedUser(val)
    }
    const handleSubmit = (val: User) => {
        setSelectedUser(val)

        if (selectedUser?.is_blocked) {

            BlockUnblock(selectedUser?._id as string, "unblock")
            setConfirm(!confirm)
            setBlock(!block)
        } else {

            BlockUnblock(selectedUser?._id as string, "block")
            setConfirm(!confirm)
            setBlock(!block)


        }
    }
    const handlePagination = (index: number) => {

        setPage(index)
        console.log(page);
        

    }
    const handlePage = (mes: string) => {
        if (mes == "next") {
            console.log(page);
            console.log(pagecount, 'pagecount');

            if (page < pagecount - 1) {
                setPage(page + 1)
            }
        } else {
            if (page > 0) {
                setPage(page - 1)
            }
        }
    }
    return (
        <>
            {/* <Nav/> */}
            <div className="flex flex-row">
                <Sidebar />
                { users&& users?.length>0?
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
                                                    <button onClick={() => handleConfirm(val)} className='h-14 w-20 text-white rounded-xl bg-green-500' >
                                                        UnBlock
                                                    </button>
                                                    : <button onClick={() => handleConfirm(val)} className='h-14 w-20 text-white rounded-xl bg-red-500' >
                                                        Block
                                                    </button>}
                                                {
                                                    confirm &&
                                                    <div id="deleteModal" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
                                                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-300 sm:p-5">
                                                                <button type="button" onClick={() => handleConfirm(val)} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                    <span className="sr-only">Close modal</span>
                                                                </button>
                                                                <p className="mb-4 text-black">{`Are you sure  to ${selectedUser?.is_blocked ? "Unblock" : "Block"} user ?`}</p>
                                                                <div className="flex justify-center items-center space-x-4">
                                                                    <button data-modal-toggle="deleteModal" onClick={() => handleConfirm(val)} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                                        No, cancel
                                                                    </button>
                                                                    <button type="submit" onClick={() => handleSubmit(val)} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                                        Yes, I'm sure
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                }
                                            </td>
                                        </tr>
                                    </>)
                                })}



                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center  mt-8'>
                        <nav aria-label="Page navigation example ">
                            <ul className="inline-flex space-x-2 text-base font-medium">
                                <li>
                                    <a href="#" onClick={() => handlePage("prev")} className=" flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-700 hover:font-bold  dark:hover:text-black">Previous</a>
                                </li>
                                {Array(pagecount).fill(null).map((_, index) => (
                                   <li>
                                   <a
                                     href="#"
                                     onClick={() => handlePagination(index)}
                                     className={`flex items-center justify-center px-4 h-10 leading-tight rounded-3xl hover:font-bold ${index === page ? 'text-white' : 'text-black'}`}
                                     style={{
                                       backgroundColor: index === page ? '#033431' : 'transparent',
                                       borderColor: index !== page ? '#033431' : 'transparent',
                                       borderWidth: index !== page ? '1px' : '0',
                                       borderStyle: index !== page ? 'solid' : 'none'
                                     }}
                                   >
                                     {index + 1}
                                   </a>
                                 </li>
                                 
                                  
                                  
                                ))}
                                <li>
                                    <a href="#" onClick={() => handlePage("next")} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight  text-gray-700 hover:font-bold    dark:hover:text-black">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                :
                <p>Users Not Found</p>
                }
                <Toaster position="top-right" reverseOrder={false} />

            </div>

        </>
    );
};

export default UserManagement;
