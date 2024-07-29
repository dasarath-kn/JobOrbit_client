import React, { useEffect, useState } from 'react'
import { getCompanies, getUsers } from '../../Api/userApi'
import { User } from '../../Interface/UserInterface'
import { Company } from '../../Interface/CompanyInterface'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
    const [userData, setUserData] = useState<User>()
    const [companyData, setCompanyData] = useState<Company>()
    const navigate = useNavigate()
    useEffect(() => {
        const user = async () => {
            try {
                const response = await getUsers()
                if (response?.data.success) {                    
                    setUserData(response.data.userDatas)
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
                }
            } catch (error) {
                console.error(error);

            }
        }
        user()
        company()
    }, [])

    return (
        <>
            <div className='min-h-screen  flex  justify-center'>
                <div className='flex flex-col'>
                    <div className='flex  flex-col mt-9'>
                        <p className='text-xl font-semibold'>Users</p>
                        <div className=' grid grid-cols-3 mt-9 gap-x-9 gap-y-9'>
                            {userData && userData.length > 0 ? userData.map((val) => {
                                return (<>

                                    <div className='w-auto  flex justify-evenly   p-8 shadow-2xl flex-row items-center bg-gray-50 h-28'>
                                        {val.img_url ? <img src={val.img_url} className='w-11 h-11 rounded-full' alt="" /> : <img src="/user06.png" className='w-11 h-11' alt="" />
                                        }                           <div>

                                            <p onClick={() => navigate('/userprofile', { state: { id: val._id } })} className='font-semibold text-xl'>{val.firstname}</p>
                                            <p className='text-gray-700'>{val.field}</p>
                                        </div>
                                        <button className='bg-black text-white rounded-xl h-11 w-20'>Connect</button>
                                    </div>
                                </>)
                            }) : (<>
                                <p>Not found</p>
                            </>)
                            }




                            <div className='flex  justify-center col-span-full space-x-2'>
                                <button className='hover:font-semibold'>Show more</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex  flex-col'>
                        <p className='text-xl font-semibold'>Companies</p>
                        <div className=' grid grid-cols-3 gap-x-9 gap-y-9 mt-9 '>
                            {companyData && companyData.length > 0 ? companyData.map((val) => {
                                return (<>
                                    <div className='w-auto  flex justify-evenly p-8 shadow-2xl flex-row items-center bg-gray-50 h-28'>
                                        {val.img_url ? <img src={val.img_url} className='w-11 h-11 rounded-full' alt="" /> : <img src="/user06.png" className='w-11 h-11' alt="" />}
                                        <div className='flex flex-col'>
                                            <div>
                                                <p onClick={() => navigate('/companyprofile', { state: { id: val._id } })} className='font-semibold text-xl'>{val.companyname}</p>
                                                <p className='text-gray-700'>{val.industry}</p>
                                            </div>
                                            <div className='mt-4 w-full max-w-xs'>
                                                <p className='truncate'>{val.about}</p>
                                            </div>
                                        </div>
                                        <button className='bg-black text-white rounded-xl h-11 w-20'>Connect</button>
                                    </div>
                                </>)
                            }) : <>
                                <div>
                                    <p>Not found</p>
                                </div>
                            </>
                            }


                            <div className='flex  justify-center col-span-full space-x-2'>
                                <button className='hover:font-semibold'>Show more</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Connections