import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getApplicants, removeApplicant, saveScheduledjob, schedulejobs } from '../../Api/companyApi'
import jobShedule, { jobdata, scheduled } from '../../Interface/CompanyInterface'
import { User } from '../../Interface/UserInterface'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { scheduledValidation } from '../../Validations/Company/Jobvalidation'

const JobApplicants = () => {
    const location = useLocation()
    const { job_id } = location.state || {}
    const [scheduled, setScheduled] = useState<jobShedule[]>([])
    const [userdata, setUserdata] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<string>()
    const [showModal, setShowModal] = useState<boolean>(false)
  
    const [updated, setUpdated] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        const job = async () => {
            try {
                let response = await getApplicants(job_id)
                if (response?.data.success) {
                    console.log(response.data.appliedUsers);

                    const data = response.data.appliedUsers.map((val: jobdata) => {
                        return val.applicants_id.map(applicant => applicant.user_id);
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
                let response = await schedulejobs(job_id)
                if (response?.data.success) {
                    setScheduled(response.data.scheduledJobs)
                }

            } catch (error) {
                console.error(error);

            }
        }
        scheduled()
    }, [updated])

    // const handleSchedule = async () => {
    //     try {
    //         const user_id =selectedUser            
    //         const scheduleData = { date, time, message, user_id, job_id }
    //         const response = await saveScheduledjob(scheduleData as any)
    //         if (response?.data.success) {
    //             setShowModal(!showModal)
    //             setUpdated(!updated)
    //             toast.success(response.data.message)
    //         }

    //     } catch (error) {
    //         console.error(error);

    //     }
    // }
    const rejectUser = async (user_id: string) => {
        try {
            const response = await removeApplicant(job_id, user_id)
            if (response?.data.success) {
                setUpdated(!updated)
            }

        } catch (error) {
            console.error(error);

        }
    }
    console.log(selectedUser,"Sssssss");
               

    const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: "",
            time: "",
            message: "",
            user_id:selectedUser,
            job_id:job_id

        },validationSchema:scheduledValidation, onSubmit: async (data:scheduled) => {
            try {
                console.log(data,"daata");
                
                const response = await saveScheduledjob(data as scheduled)
                if (response?.data.success) {
                    setShowModal(!showModal)
                    setUpdated(!updated)
                    toast.success(response.data.message)
                }

            } catch (error) {
                console.error(error);

            }
        }
    })
    return (
        <>
            <div className='min-h-screen  justify-center items-center'>
                <div className='flex justify-center m-9   '>
                    <p className='text-3xl font-semibold'>Job Applicants</p>

                </div>
                <div className=' grid lg:grid-cols-2 lg:mb-16 md:grid-row-1 md:w-full md:ml-0  sm:grid-row-1 lg:w-4/5 lg:ml-36 p-2  gap-x-10 h-auto justify-center items-center'>
                    {userdata && userdata.length > 0 ? userdata.map((val: User, index) => {


                        return (<>
                            <div key={val._id} className='flex justify-center mb-9 bg-gray-100 w-full lg:w-auto lg:h-32 lg:m-8 sm:p-8 p-4'>
                                <ul className='flex flex-col lg:flex-row md:flex-row sm:flex-col lg:space-x-6 md:space-x-20 sm:space-y-4 lg:space-y-0 md:space-y-0 items-center font-medium'>
                                    <li>{index + 1}</li>
                                    <li>{val.firstname}</li>
                                    <li>{val.email}</li>
                                    <li className='cursor-pointer' onClick={() => navigate('/company/applicantprofile', { state: { id: val._id } })}>view More</li>
                                    {!scheduled.some((values) => values.user_id?._id === val._id) ? <li className='cursor-pointer' onClick={() => { setShowModal(!showModal), setSelectedUser(val._id) }}>Schedule</li> :

                                        <li className='text-orange-500 cursor-pointer'>Scheduled</li>
                                    }
                                    {!scheduled.some((values) => values.user_id?._id === val._id) &&
                                        <li onClick={() => rejectUser(val._id as string)} className='text-red-500 cursor-pointer'>Reject</li>}
                                </ul>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />


                            </div>
                            {showModal && (<>
                                <form onSubmit={handleSubmit}>
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
                                                        <input type="date" name='date' onChange={handleChange} onBlur={handleBlur} value={values.date} className='w-2/3 h-11 border-6 border-black' />
                                                        {touched.date && errors.date ? <div className="text-red-500 text-sm">{errors.date}</div> : null}

                                                    </div>
                                                    <div className='space-x-6'>
                                                        <label htmlFor="time" className='text-black font-medium'>Time</label>

                                                        <input type="time" name='time' onChange={handleChange} onBlur={handleBlur} value={values.time} className='w-2/3 h-11 border-6 border-black' />
                                                        {touched.time && errors.time ? <div className="text-red-500 text-sm">{errors.time}</div> : null}

                                                    </div>
                                                    <div className='space-x-6'>
                                                        <label htmlFor="message" className='text-black font-medium'>Message</label>
                                                        <input type="message" name='message' onChange={handleChange} onBlur={handleBlur} value={values.message} className='w-2/3 h-11 border-6 border-black' placeholder='Enter message' />
                                                        {touched.message && errors.message ? <div className="text-red-500 text-sm">{errors.message}</div> : null}

                                                    </div>
                                                    <button className='w-full bg-black h-11 text-white'>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>)}
                        </>)
                    }) : (<>
                        <div className='flex justify-center items-center w-full mb-11'>

                            <p className='text-center text-2xl font-medium '>No applicants found</p>
                        </div>
                    </>)}




                </div>
                {userdata && userdata.length > 0 && <div className="flex flex-col items-center mt-24">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900">{1}</span> of <span className="font-semibold text-gray-900">{1}</span> Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
                        >
                            Prev
                        </button>
                        <button
                            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
                        >
                            Next
                        </button>
                    </div>
                </div>}


            </div>
        </>
    )
}

export default JobApplicants