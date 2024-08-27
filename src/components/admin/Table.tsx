import { useEffect, useState } from "react"
import { User } from "../../Interface/UserInterface";
import { companyBlockUnblock, getCompanies, getUsers, userBlockUnblock } from "../../Api/adminApi";
import toast from "react-hot-toast";
import { Company } from "../../Interface/CompanyInterface";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import DetailsModal from "./DetailsModal";

interface props {
    role: string
  }
const Table:React.FC<props> = ({role}) => {
    const [page, setPage] = useState<number>(0)
    const [users, setUsers] = useState<User[] | Company[]>([]);
    const [showmodal, setShowmodal] = useState<boolean>(false)
    const [pagecount, setPagecount] = useState<number>(0)
    const [updated, setUpdated] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<User | Company>();
    const [block, setBlock] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

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
        const companyData = async () => {
            try {
                let response = await getCompanies(page)
                let data = response?.data.companyDatas
                setUsers(data)
                setPagecount(response?.data.count)
            } catch (error) {
                console.error(error);

            }
        }
        if(role =="User"){

            Userdata()
        }else{

            companyData()
        }


    }, [block, page,updated])
      const BlockUnblock = async (id: string, status: string) => {
        if(role =="User"){
            let response = await userBlockUnblock(id, status)
        toast.success(response?.data.message)
        }else{
            let response = await companyBlockUnblock(id, status)
            setUpdated(!updated)
        toast.success(response?.data.message)   
        }
    }
    const handleConfirm = (val: User|Company) => {
        setConfirm(!confirm)
        setSelectedUser(val)
    }
    const handlemodal = (user: User |Company) => {
        setSelectedUser(user)
        setShowmodal(!showmodal)

    }
    const handleSubmit = (val: User |Company) => {
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

    }
    const handlePage = (mes: string) => {
        if (mes == "next") {

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
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-lg border-4 text-black">
                                <tr>
                                    <th scope="col" className="px-6 py-9">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-9">
                                        {role =="User" ?"UserDetails":"CompanyDetails"}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                   {role =="Company" && <th scope="col" className="px-6 py-3">
                                        Document
                                    </th>}
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                   {role =="Company" && <th scope="col" className="px-6 py-3">
                                        Verification
                                    </th>}
                                    <th scope="col" className="px-6 py-3">
                                        Block/Unblock
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {users && users.map((val:User|Company, index) => {
                                    return (<>

                                        <tr key={val._id} className=" text-black font-medium text-xl">

                                            <td className="px-6 py-6">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-6">
                                                {role=="User" && 'firstname' in val ?val.firstname:'companyname'in val && val.companyname}
                                            </td>
                                            <td className="px-6 py-6 ">
                                                <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="h-14 w-20 text-white rounded-xl" onClick={() => handlemodal(val)} style={{ backgroundColor: '#033431' }} type="button">
                                                    Details
                                                </button>

                                                {showmodal && selectedUser && (
                                                    <DetailsModal role={role} data={selectedUser} closeModal ={()=>setShowmodal(false)}/>
                                                
                                                )}

                                            </td>
                                            {role =="Company" &&                                 <td className="px-6 py-6">
                                                    <button onClick={() => {
                                                        if ('document_url' in val &&val.document_url) {
                                                            window.open(val.document_url, '_blank');

                                                        }
                                                    }} className='underline hover:text-blue-500'>Document</button>
                                                </td>}
                                            <td className="px-6 py-6">
                                                {val.is_blocked ? "Blocked" : "Active"}
                                            </td>
                                          { role =="Company" &&  <td className="px-6 py-6 flex mt-4 ">
                                                    {"admin_verified" in val && val.admin_verified ? "Verfied" :
                                                        <>
                                                            <RiVerifiedBadgeFill onClick={() => BlockUnblock(val._id as string, "verify")} className='text-green-600 size-10' />
                                                            <IoCloseCircle onClick={() => BlockUnblock(val._id as string, "reject")} className='text-red-700 size-10' />
                                                        </>
                                                    }



                                                </td>}
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
                                                                <p className="mb-4 text-black">{`Are you sure  to ${selectedUser?.is_blocked ? "Unblock" : "Block"} ${role} ?`}</p>
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
    </>
  )
}

export default Table