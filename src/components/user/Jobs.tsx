import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { jobdata } from '../../Interface/CompanyInterface'
import { getJobs, getUserdata } from '../../Api/userApi'
import { useNavigate } from 'react-router-dom'
import { setUserdetails } from '../../Redux/UserSlice'
import { useDispatch } from 'react-redux'
import { TiArrowSortedDown } from "react-icons/ti";

const Jobs = () => {
  const dispatch = useDispatch()
  let [jobdata, setJobdata] = useState<jobdata[]>([])
  let [search, setSearch] = useState<string>('')
  let [data, setData] = useState<jobdata[]>()
  const [pagecount, setPagecount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [datePostedModal, setDatePostedModal] = useState(false);
  const [jobLocationModal, setJobLocationModal] = useState(false);
  const [jobTypeModal, setJobTypeModal] = useState(false);
  const [handleDate, setHandleDate] = useState<string>('')
  const [handleJobLocation, setHandleJobLocation] = useState<string>('')
  const [handleJobType, setHandleJobType] = useState<string>('')
  const [changed, setChanged] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    let jobs = async () => {
      try {
        let response = await getJobs(page, handleJobType, handleJobLocation, handleDate)
        if (response?.data) {
          setPagecount(response.data.count)
          setJobdata(response.data.jobs)
          setData(response.data.jobs)
        }
      } catch (error) {
        console.error(error);

      }
    }
    jobs()
  }, [page, changed])
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await getUserdata()
        if (response?.data.success) {

          dispatch(setUserdetails(response?.data.userData))
        }

      } catch (error) {
        console.error(error);

      }
    }
    userData()


  }, [dispatch])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value == '') {
      setJobdata(data as any)
    }


  }
  const handleSubmit = () => {

    const filterData = jobdata.filter((val) => {
      return val.jobtitle.toLowerCase().includes(search.toLocaleLowerCase())
    })
    setJobdata(filterData)
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

  const handleSubmitJobType = async () => {
    setChanged(!changed)
    setJobTypeModal(!jobTypeModal)

  }
  const handleSubmitJobLocation = async () => {
    setChanged(!changed)
    setJobLocationModal(!jobLocationModal)
  }
  const handleSubmitJobDate = async () => {
    setChanged(!changed)
    setDatePostedModal(!datePostedModal)

  }
  const reset = () => {
    setHandleDate('')
    setHandleJobLocation('')
    setHandleJobType('')
    setChanged(!changed)
  }
  return (
    <>
      <div className="w-screen h-auto min-h-screen  mt-6 mb-8 ">
        <div className='flex justify-center items-center space-y-9 flex-col text-center'>

          <p className='  font-medium text-3xl'>Search And Apply The Job You Want</p>
          <div className='flex items-center  border rounded-xl h-12 w-80 lg:w-96 px-4 mt-4 lg:mt-0'>
            <FaSearch className='text-gray-400 mr-2' />
            <input value={search} className='flex-grow border-none focus:outline-none' onChange={(e) => handleSearch(e)} type="text" placeholder='Search' />
            <button onClick={handleSubmit} className='bg-black text-white rounded-xl w-20 h-8 ml-2'>Search</button>
          </div>
         {jobdata.length>0 && <div className='flex lg:flex-row space-y-4 sm:flex-row md:space-y-0 md:space-x-4 flex-col lg:space-x-16 sm:space-y-4 lg:space-y-0 '>
            <div className='relative flex items-center border-2 border-black w-48 h-12 rounded-full'>
              <p className='ml-4'>Date Posted</p>
              <TiArrowSortedDown
                onClick={() => setDatePostedModal(!datePostedModal)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 cursor-pointer'
              />
              {datePostedModal && (
                <div className="absolute right-0 top-full mt-2 w-60 z-50 bg-white border border-gray-200 rounded-lg dark:text-white shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="any-time"
                        name="datePosted"
                        value="any-time"
                        checked={handleDate === 'any-time'}
                        className="mr-2"
                        onChange={(e) => setHandleDate(e.target.value)}
                      />
                      <label htmlFor="any-time" className="text-black">Any time</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="last-week"
                        name="datePosted"
                        value="last-week"
                        className="mr-2"
                        checked={handleDate === 'last-week'}


                        onChange={(e) => setHandleDate(e.target.value)}
                      />
                      <label htmlFor="last-week" className="text-black">Last Week</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="last-month"
                        name="datePosted"
                        value="last-month"
                        className="mr-2"
                        checked={handleDate === 'last-month'}

                        onChange={(e) => setHandleDate(e.target.value)}
                      />
                      <label htmlFor="last-month" className="text-black">Last Month</label>
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmitJobDate}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='relative flex items-center border-2 border-black w-48 h-12 rounded-full'>
              <p className='ml-4'>Job Location</p>
              <TiArrowSortedDown
                onClick={() => setJobLocationModal(!jobLocationModal)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 cursor-pointer'
              />
              {jobLocationModal && (
                <div className="absolute right-0 top-full mt-2 w-60 z-50 bg-white border border-gray-200 rounded-lg dark:text-white shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="Onsite"
                        name="jobLocation"
                        value="Onsite"
                        checked={handleJobLocation === 'Onsite'}

                        className="mr-2"
                        onChange={(e) => setHandleJobLocation(e.target.value)}
                      />
                      <label htmlFor="onsite" className="text-black">Onsite</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="Remote"
                        name="jobLocation"
                        value="Remote"
                        className="mr-2"
                        checked={handleJobLocation === 'Remote'}

                        onChange={(e) => setHandleJobLocation(e.target.value)}

                      />
                      <label htmlFor="remote" className="text-black">Remote</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="Hybrid"
                        name="jobLocation"
                        value="Hybrid"
                        className="mr-2"
                        checked={handleJobLocation === 'Hybrid'}

                        onChange={(e) => setHandleJobLocation(e.target.value)}

                      />
                      <label htmlFor="hybrid" className="text-black">Hybrid</label>
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmitJobLocation}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='relative flex items-center border-2 border-black w-48 h-12 rounded-full'>
              <p className='ml-4'>Job Type</p>
              <TiArrowSortedDown
                onClick={() => setJobTypeModal(!jobTypeModal)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 cursor-pointer'
              />
              {jobTypeModal && (
                <div className="absolute right-0 top-full mt-2 w-60 z-50 bg-white border border-gray-200 rounded-lg dark:text-white shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="full-time"
                        name="jobType"
                        value="Fulltime"
                        className="mr-2"
                        checked={handleJobType === 'Fulltime'}

                        onChange={(e) => setHandleJobType(e.target.value)}

                      />
                      <label htmlFor="full-time" className="text-black">Full-time</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="Parttime"
                        name="jobType"
                        value="Parttime"
                        className="mr-2"
                        checked={handleJobType === 'Parttime'}

                        onChange={(e) => setHandleJobType(e.target.value)}

                      />
                      <label htmlFor="part-time" className="text-black">Part-time</label>
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmitJobType}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className='relative flex items-center  border-black w-48 h-12 justify-center border-2 rounded-full'>

              <button onClick={reset} className='text-bold text-xl text-black hover:font-semibold'>Reset</button>
            </div>
          </div>}



        </div>
        <div className='flex justify-center'>


          <div className=" grid mt-12 h-auto lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-10">
            {jobdata.length > 0 ? (jobdata.map((val) => {
              return (<>

                <div className="p-6 sm:w-40 lg:w-80 md:w-80 h-40 rounded-md border shadow-xl">
                  <h2 className="font-medium text-xl">{val.jobtitle}</h2>
                  <p>{val.company_id.companyname}</p>
                  <div className="flex items-center text-gray-400">
                    <FaMapMarkerAlt />
                    <p className="ml-2 text-black">{val.company_id.state}</p>
                  </div>
                  <button onClick={() => navigate('/jobdetails', { state: { job_id: val._id } })} className="rounded-xl my-3 bg-black text-white w-20 h-7">View</button>
                </div>
              </>)
            })) : (<>
              <div className="flex  min-h-screen  mt-11">
                <div className="w-full  h-40   flex  justify-center   ">
                  <p className="text-black font-semibold text-2xl text-center mt-4">No Jobs Found</p>
                </div>
              </div>
            </>)}
          </div>
        </div>
        {jobdata.length > 0 && <div className="flex flex-col items-center mt-24">
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
      </div>

    </>
  )
}

export default Jobs
