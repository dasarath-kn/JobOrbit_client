import React from 'react'
import { Company } from '../../Interface/CompanyInterface'
import { User } from '../../Interface/UserInterface'
interface Props {
    role: string,
    data: User | Company
    closeModal: () => void
}
const DetailsModal: React.FC<Props> = ({ role, data, closeModal }) => {

    return (
        <>
            <div
                id="default-modal"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                aria-hidden="true"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {role == "User" ? "Userdetails" : "Companydetails"}
                            </h3>
                            <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {role == "User" ? "Firstname" : "Companyname"}:
                                {role == "User" && 'firstname' in data ? data.firstname : 'companyname' in data && data.companyname}

                            </p>
                            {role == "User" && <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Lastname: {'lastname' in data && data.lastname}
                            </p>}
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Email: {data.email}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                PhoneNumber: {data.phonenumber}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {role == "User" ? "Field" : "Industry"}: {role == "User" && 'field' in data ? data.field : 'industry' in data && data.industry}

                            </p>
                            {role == "User" && <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Location:{'location' in data && data.location}
                            </p>}
                            {role == "Company" && (<>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    State:{'state'in data && data?.state}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    City:{'city'in data && data?.city}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Adreess:{'address'in data && data?.address}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    About:{'about'in data && data?.about}
                                </p>
                            </>)

                            }
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" onClick={closeModal} type="button" className="text-white bg-red-500 hover:bg-red-500    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsModal