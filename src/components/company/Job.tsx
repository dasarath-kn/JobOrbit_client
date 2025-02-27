import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { getJob, listJob, postJob, removeJob } from '../../Api/companyApi'
import toast, { Toaster } from 'react-hot-toast'
import { jobdata } from '../../Interface/CompanyInterface'
import { formatDistanceToNow } from 'date-fns'
import { FaMapMarkerAlt } from 'react-icons/fa'
import JobvalidationSchema from '../../Validations/Company/Jobvalidation'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const [openmodal, setOpenmodal] = useState<boolean>(false)
  const [jobdata, setJobdata] = useState<jobdata[]>([])
  const [confirm, setConfirm] = useState<boolean>(false)
  const [pagecount, setPagecount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [updated, setUpdated] = useState<boolean>(false)
  const [selectedJob,setSelectedJob]=useState<jobdata>()
  const navigate = useNavigate()
  const { touched, values, errors, handleChange, resetForm, handleBlur, handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id:selectedJob?._id || '',
      jobtitle:selectedJob?.jobtitle || '',
      description:selectedJob?.description ||  '',
      responsibilities:selectedJob?.responsibilities || '',
      requirements:selectedJob?.requirements ||  '',
      qualification:selectedJob?.qualification || '',
      skills:selectedJob?.skills || '',
      type:selectedJob?.type || '',
      location:selectedJob?.location || '',
      closedate:selectedJob?.closedate|| ''

    }, validationSchema: JobvalidationSchema, onSubmit: async (Data) => {
      try {
        let response = await postJob(Data as jobdata)

        if (response?.data.success) {
          setOpenmodal(!openmodal)
          toast.success(response.data.message)
          resetForm();
        }
      } catch (error) {
        console.error(error);

      }

    }
  })
  console.log(selectedJob?.jobtitle);
  
  useEffect(() => {
    let jobData = async () => {
      try {
        let response = await getJob(page)
        setJobdata(response?.data.jobs)
        setPagecount(response?.data.count)

      } catch (error) {
        console.error(error);

      }
    }
    jobData()


  }, [openmodal, confirm, page, updated])
  const handleConfirm = async (id: string) => {
    try {

      setConfirm(!confirm)
      let response = await removeJob(id)
      if (response?.data) {
        toast.success(response.data.message)
      }

    } catch (error) {
      console.error(error);

    }
  }
  const handleApplicant = (job_id: string) => {
    navigate('/company/applicants', { state: { job_id: job_id } })
  }
  const handleScheduled = (job_id: string) => {
    navigate('/company/scheduled', { state: { job_id: job_id } })
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

  const handleJobvisibilty = async (job_id: string, status: string) => {
    try {
      const response = await listJob(job_id, status)
      if (response?.data.success) {
        toast.success(response.data.message)
        setUpdated(!updated)
      }
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <>
      <div className='w-full h-auto  min-h-screen flex-col   lg:flex pb-20 pt-8'>
        <div className='lg:ml-64'>

          <button onClick={() =>{ setOpenmodal(!openmodal),setSelectedJob(undefined)}} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className=' mt-7  font-semibold text-lg border-1 rounded-xl bg-black text-white w-28 h-11  ml-5 '>Add jobs</button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:ml-40 lg:mt-8 px-4 sm:px-6 lg:px-0">
            {
              jobdata && jobdata.length > 0 ? (
                jobdata.map((val: jobdata) => {
                  return (
                    <div key={val._id} className="p-6 m-2 flex flex-col space-y-3 sm:w-40 lg:w-[500px] h-auto rounded-md border shadow-xl">
                      <div className='flex justify-end'>
                        <p>{formatDistanceToNow(new Date(val.time), { addSuffix: true })}</p>
                      </div>
                      <h2 className="font-semibold text-xl sm:text-2xl cursor-pointer" onClick={() => navigate('/company/jobdetails', { state: { job_id: val._id } })}>
                        {val.jobtitle}
                      </h2>
                      <p className='font-medium'>{val.company_id.companyname}</p>
                      <div className="flex items-center text-gray-400">
                        <FaMapMarkerAlt />
                        <p className="ml-2 text-black">{val.company_id.state}</p>
                      </div>
                      <p className='font-medium'>{val.type}</p>
                      <p className='font-medium'>{val.location}</p>
                      <p>{val.description}</p>
                      <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 items-center'>
                        <button onClick={() => setConfirm(!confirm)} className="rounded-xl my-3 bg-red-600 text-white w-full sm:w-20 h-11">Remove</button>
                        <button onClick={() => {setOpenmodal(!openmodal),setSelectedJob(val)}} className="rounded-xl my-3 border-2 text-black  border-black w-full sm:w-20 h-11">Edit</button>
                        <button onClick={() => handleApplicant(val._id)} className='border-black border-2 w-full sm:w-1/3 h-11 rounded-xl hover:font-semibold'>View Applicants</button>
                        <button onClick={() => handleScheduled(val._id)} className='border-black border-2 w-full sm:w-1/3 h-11 rounded-xl hover:font-semibold'>Scheduled</button>
                      </div>
                      <div className='w-full flex justify-center h-11'>
                        {val.list ? (
                          <button onClick={() => handleJobvisibilty(val._id, "block")} className='bg-red-500 rounded-lg text-lg font-medium hover:bg-white border-2 hover:text-red-500 text-white w-full'>
                            Unlist
                          </button>
                        ) : (
                          <button onClick={() => handleJobvisibilty(val._id, "unblock")} className='bg-green-500 rounded-lg text-lg font-medium hover:bg-white border-2 hover:text-green-500 text-white w-full'>
                            Unlist
                          </button>
                        )}
                      </div>
                      {confirm && (
                        <div id="deleteModal" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden">
                          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-300 sm:p-5">
                              <button type="button"onClick={()=>setConfirm(!confirm)} className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <p className="mb-4 text-black">Are you sure you want to delete the job?</p>
                              <div className="flex justify-center items-center space-x-4">
                                <button onClick={()=>setConfirm(!confirm)} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                  No, cancel
                                </button>
                                <button type="submit" onClick={() => handleConfirm(val._id)} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                  Yes, I'm sure
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className='flex w-full h-full items-center justify-center'>
                  <p className='text-black font-semibold text-2xl'>No Jobs Found</p>
                </div>
              )
            }
          </div>
        </div>

        {jobdata && jobdata.length > 0 && <div className="flex flex-col items-center mt-24">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 ">{page + 1}</span> of <span className="font-semibold text-gray-900">{pagecount}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button onClick={() => handlePage("prev")} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Prev
            </button>
            <button onClick={() => handlePage("next")} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </div>
        </div>}



        {
          openmodal && (


            <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center items-center fixed top-0 right-0 left-0 z-50 w-full h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-1/2 max-h-full"> {/* Adjusted width to half of the screen */}
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold dark:text-black">
                      Add job
                    </h3>
                    <button onClick={() => setOpenmodal(!openmodal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2"> {/* Updated grid to have 2 columns */}
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Jobtitle</label>
                        <textarea onChange={handleChange} onBlur={handleBlur} value={values.jobtitle} name="jobtitle" id="jobtitle" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter job title" />
                        {touched.jobtitle && errors.jobtitle ? <div className="text-red-500 text-sm">{errors.jobtitle}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Description</label>
                        <textarea onChange={handleChange} onBlur={handleBlur} value={values.description} name="description" id="description" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter job description" />
                        {touched.description && errors.description ? <div className="text-red-500 text-sm">{errors.description}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Responsibilities</label>
                        <textarea onChange={handleChange} value={values.responsibilities} name="responsibilities" id="responsibilities" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter responsibilities" />
                        {touched.responsibilities && errors.responsibilities ? <div className="text-red-500 text-sm">{errors.responsibilities}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Requirements</label>
                        <textarea onChange={handleChange} value={values.requirements} name="requirements" id="requirements" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter requirements" />
                        {touched.requirements && errors.requirements ? <div className="text-red-500 text-sm">{errors.requirements}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Qualification</label>
                        <textarea onChange={handleChange} value={values.qualification} name="qualification" id="qualification" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter qualifications" />
                        {touched.qualification && errors.qualification ? <div className="text-red-500 text-sm">{errors.qualification}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Skills</label>
                        <textarea onChange={handleChange} value={values.skills} name="skills" id="skills" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter skills" />
                        {touched.skills && errors.skills ? <div className="text-red-500 text-sm">{errors.skills}</div> : null}
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-black">Close Date</label>
                        <input onChange={handleChange} type='number' value={values.closedate} name="closedate" id="closedate" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter close date" />
                        {touched.closedate && errors.closedate ? <div className="text-red-500 text-sm">{errors.closedate}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Type</label>
                        <select onChange={handleChange} id="type" name="type" className="bg-gray-400 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option value="">Select an type</option>

                          <option value="Fulltime">Full-time</option>
                          <option value="Parttime">Part-time</option>
                        </select>
                        {touched.type && errors.type ? <div className="text-red-500 text-sm">{errors.type}</div> : null}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-black">Location</label>
                        <select onChange={handleChange} id="location" name="location" className="bg-gray-400 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option value="">Select an location</option>

                          <option value="Onsite">Onsite</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Remote">Remote</option>
                        </select>
                        {touched.location && errors.location ? <div className="text-red-500 text-sm">{errors.location}</div> : null}
                      </div>
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

            </div>


          )
        }

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default Job