import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Company } from '../../Interface/CompanyInterface'
import { companyBlockUnblock, getCompanies } from '../../Api/adminApi'
import toast, { Toaster } from 'react-hot-toast'

const CompanyManagement = () => {
    const [company, setCompany] = useState<Company[] | null>([])
    const [showmodal, setShowmodal] = useState<boolean>(false)

    useEffect(() => {
        const companyData = async () => {
            try {
                let response = await getCompanies()
                let data = response?.data.companyDatas
                setCompany(data)
            } catch (error) {
                console.error(error);

            }
        }
        companyData()
    }, [company])
    const handlemodal = () => {
        setShowmodal(!showmodal)
        console.log(showmodal);

    }
    const BlockUnblock =async(company_id:string,status:string)=>{
        let response = await companyBlockUnblock(company_id,status)
        
    toast.success(response?.data.message)


    }

    return (
        <>
            <div className="flex flex-row">
                <SideBar />
                <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">



                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-lg border-4 text-black">
                                <tr>
                                    <th scope="col" className="px-6 py-9">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-9">
                                        CompanyDetails
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Verification
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Block/Unblock
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {company && company.map((val, index) => {
                                    return (
                                        <>

                                            <tr className=" text-black font-medium text-xl">

                                                <td className="px-6 py-6">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {val.companyname}
                                                </td>
                                                <td className="px-6 py-6 ">
                                                    <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="h-14 w-20 text-white rounded-xl" onClick={handlemodal} style={{ backgroundColor: '#033431' }} type="button">
                                                        Details
                                                    </button>

                                                    {showmodal && (
                                                        <div
                                                            id="default-modal"
                                                            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                                {/* <!-- Modal content --> */}
                                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                    {/* <!-- Modal header --> */}
                                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                            Userdetails
                                                                        </h3>
                                                                        <button type="button" onClick={handlemodal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                            </svg>
                                                                            <span className="sr-only">Close modal</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-4 md:p-5 space-y-4">
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            Companyname:{val.companyname}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            Email:{val.email}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            PhoneNumber:{val.phonenumber}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            Industry:{val.industry}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            State:{val.state}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            City:{val.city}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            Adreess:{val.address}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            About:{val.about}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                                        <button data-modal-hide="default-modal" onClick={handlemodal} type="button" className="text-white bg-red-500 hover:bg-red-500    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {val.is_blocked ? "Blocked" : "Active"}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {val.is_verified ? "Verfied" :
                                                        <button onClick={()=>BlockUnblock(val._id as string ,"verify")} className='h-14 w-20 text-white rounded-xl bg-green-500' >
                                                            Verify
                                                        </button>}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {val.is_blocked ?
                                                        <button onClick={()=>BlockUnblock(val._id as string ,"unblock")} className='h-14 w-20 text-white rounded-xl bg-green-500' >
                                                            UnBlock
                                                        </button>
                                                        : <button onClick={()=>BlockUnblock(val._id as string ,"block")} className='h-14 w-20 text-white rounded-xl bg-red-500' >
                                                            Block
                                                        </button>}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>

                </div>
                <Toaster position="top-right" reverseOrder={false} />

            </div>
        </>
    );
}

export default CompanyManagement