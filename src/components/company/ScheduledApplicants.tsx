import  { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { schedulejobs } from '../../Api/companyApi'
import jobShedule from '../../Interface/CompanyInterface'
import  { Toaster } from 'react-hot-toast'
import { format } from 'date-fns'
const ScheduledApplicants = () => {
    const location = useLocation()
    const [detailModal, setDetailModal] = useState<boolean>(false)
    const { job_id } = location.state || {}
    const [scheduled, setScheduled] = useState<jobShedule[]>([])


    const navigate = useNavigate()

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
    }, [])



    return (
        <>
            <div className='min-h-screen  justify-center items-center'>
                <div className='flex justify-center m-9   '>
                    <p className='text-3xl font-semibold'>Scheduled Applicants</p>

                </div>
                <div className=' grid lg:grid-cols-2 lg:mb-16 md:grid-row-1 md:w-full md:ml-0  sm:grid-row-1 lg:w-4/5 lg:ml-36 p-2  gap-x-10 h-auto justify-center items-center'>
                    {scheduled && scheduled.length > 0 ? scheduled.map((val, index) => {


                        return (<>
                            <div className='flex justify-center mb-9 bg-gray-100 w-full lg:w-auto lg:h-32 lg:m-8 sm:p-8 p-4'>
                                <ul className='flex flex-col lg:flex-row md:flex-row sm:flex-col lg:space-x-6 md:space-x-20 sm:space-y-4 lg:space-y-0 md:space-y-0 items-center font-medium'>
                                    <li>{index + 1}</li>
                                    <li className='cursor-pointer' onClick={() => navigate('/company/applicantprofile', { state: { id: val.user_id._id } })}>{val.user_id.firstname}</li>
                                    <li className='cursor-pointer' onClick={() => navigate('/company/applicantprofile', { state: { id: val.user_id._id } })}>{val.user_id.email}</li>
                                    <li className='cursor-pointer' onClick={() => setDetailModal(!detailModal)}>view Details</li>


                                </ul>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                                {detailModal && (<>
                                    <div id="popup-modal" className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow ">
                                                <button type="button" onClick={() => setDetailModal(!detailModal)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                                <div className="p-4 md:p-5 space-y-11 text-center">
                                                    <p className='font-semibold text-xl'>Scheduled Details</p>
                                                    <div className='space-x-6 flex flex-row justify-center'>
                                                        <label htmlFor="date" className='text-black font-semibold'>Date</label>
                                                        <p>{format(new Date(val.date), 'dd MMMM, yyyy')}</p>
                                                    </div>
                                                    <div className='space-x-6 flex flex-row justify-center'>
                                                        <label htmlFor="time" className='text-black font-semibold'>Time</label>

                                                        <p>{val.time}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)}

                            </div>

                        </>)
                    }) : (<>
                        <div className='flex justify-center items-center w-full mb-11'>

                            <p className='text-center text-2xl font-medium '>Scheduled Users not found</p>
                        </div>
                    </>)}





                </div>


            </div>
        </>
    )
}

export default ScheduledApplicants