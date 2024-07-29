import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getApplicants, saveScheduledjob, schedulejobs } from '../../Api/companyApi'
import jobShedule, { jobdata } from '../../Interface/CompanyInterface'
import { User } from '../../Interface/UserInterface'
import { setDate } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'

const JobApplicants = () => {
    const location = useLocation()
    const { job_id } = location.state || {}
    const [scheduled, setScheduled] = useState()
    const [jobdata, setJobdata] = useState<jobdata>()
    const [userdata, setUserdata] = useState<User>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [date, SetDate] = useState<Date>()
    const [time, SetTime] = useState()
    const [message, SetMessage] = useState<String>()
    const [updated, setUpdated] = useState<boolean>(false)
    useEffect(() => {
        const job = async () => {
            try {
                let response = await getApplicants(job_id)
                if (response?.data.success) {
                    setJobdata(response.data.appliedUsers)
                    console.log(response.data.appliedUsers, "ss");

                    const data = response.data.appliedUsers.map((val) => {
                        return val.applicants_id
                    }).flat()
                    setUserdata(data)
                }
            } catch (error) {
                console.error(error);

            }
        }

        job()

    }, [updated])
    useEffect(() => {
        const scheduled = async () => {
            try {
                let response = await schedulejobs()
                if (response?.data.success) {
                    setScheduled(response.data.scheduledJobs)
                }

            } catch (error) {
                console.error(error);

            }
        }
        scheduled()
    }, [updated])
        console.log(scheduled,"dfssf");
        
    const handleSchedule = async (user_id: string) => {
        try {
            const scheduleData = { date, time, message, user_id, job_id }
            const response = await saveScheduledjob(scheduleData as jobShedule)
            if (response?.data.success) {
                setShowModal(!showModal)
                setUpdated(!updated)
                toast.success(response.data.message)
            }

        } catch (error) {
            console.error(error);

        }
    }
    const isUserScheduled = (user_id: string) => {
        return scheduled.some(s => s.user_id === user_id)
    }
    return (
        <>
            <div className='min-h-screen  justify-center items-center'>
                <div className='flex justify-center m-9   '>
                    <p className='text-3xl font-semibold'>Job Applicants</p>

                </div>
                <div className=' grid lg:grid-cols-2 lg:mb-16 md:grid-row-1 md:w-full md:ml-0  sm:grid-row-1 lg:w-4/5 lg:ml-36 p-2  gap-x-10 h-auto justify-center items-center'>
                    {userdata && userdata.length > 0 ? userdata.map((val, index) => {
                      
                        
                        return (<>
                            <div className=' flex  justify-center mb-9  bg-gray-100   w-auto   lg:h-32 lg:m-8  sm:p-8'>
                                    <ul className='flex flex-col lg:flex-row md:flex-row sm:flex-col space-x-3 md:space-x-20 md:p-0 p-8 lg:space-x-16 items-center  font-medium'>
                                    <li>{index + 1}</li>
                                    <li>{val.firstname}</li>
                                    <li>{val.email}</li>
                                    <li>view More</li>
                                    {!isUserScheduled(val._id) ?<li onClick={() => setShowModal(!showModal)}>Schedule</li> :
                                        
                                        <li className='text-orange-500'>Scheduled</li>
                                    }
                                </ul>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />


                            </div>
                            {showModal && (<>
                                <div id="popup-modal" className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                        <div className="relative bg-white rounded-lg shadow ">
                                            <button type="button" onClick={() => setShowModal(!showModal)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-4 md:p-5 space-y-11 text-center">
                                                <p className='font-semibold text-xl'>Schedule Interview</p>
                                                <div className='space-x-6'>
                                                    <label htmlFor="date" className='text-black font-medium'>Date</label>
                                                    <input type="date" onChange={(e) => SetDate(e.target.value)} className='w-2/3 h-11 border-6 border-black' />
                                                </div>
                                                <div className='space-x-6'>
                                                    <label htmlFor="time" className='text-black font-medium'>Time</label>

                                                    <input type="time" onChange={(e) => SetTime(e.target.value)} className='w-2/3 h-11 border-6 border-black' />

                                                </div>
                                                <div className='space-x-6'>
                                                    <label htmlFor="message" className='text-black font-medium'>Message</label>
                                                    <input type="text" onChange={(e) => SetMessage(e.target.value)} className='w-2/3 h-11 border-6 border-black' placeholder='Enter message' />
                                                </div>
                                                <button type='button' onClick={() => handleSchedule(val._id)} className='w-full bg-black h-11 text-white'>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                        </>)
                    }) : (<>
                        <div className='flex justify-center items-center w-full mb-11'>

                            <p className='text-center text-2xl font-medium '>No applicants found</p>
                        </div>
                    </>)}





                </div>


            </div>
        </>
    )
}

export default JobApplicants