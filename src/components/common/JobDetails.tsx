import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { jobdata } from '../../Interface/CompanyInterface';
import { useLocation } from 'react-router-dom';
import { getUserdata, jobApply, uploadResume, viewJobdetails } from '../../Api/userApi';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import { User } from '../../Interface/UserInterface';

const JobDetails = () => {
  const [job, setJob] = useState<jobdata>();
  const [updated, setUpdated] = useState(false)
  const [resumeError, setResumeError] = useState<string>('')
  const [limit, setLimit] = useState<Number>(0)
  const [skelton, setSkelton] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [resumeData, setResumeData] = useState<[string]>()
  const location = useLocation();
  const { job_id } = location.state;
  const [resume, setResume] = useState<File | undefined>()
  const [buttonLoad, setButtonload] = useState<boolean>(false)
  const [resumeUrl, setResumeUrl] = useState<number>()
  const [resumeLink, setResumeLink] = useState<string>('')
  const userDatas: User = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await getUserdata()
        if (response?.data.success) {
          console.log(response.data.userData.resume_url);
          
          const sortedResumes = response?.data.userData.resume_url.sort((a: string, b: string) => b.localeCompare(a));
          setResumeData(sortedResumes)
        }

      } catch (error) {
        console.error(error);

      }
    }
    userData()
  }, [updated])

  const fileInputRef: any = useRef();
  const handlePdf = (e: ChangeEvent<HTMLInputElement>) => {
    try {

      if (e.target.files && e.target.files.length > 0) {
        let file = e.target.files[0];
        setResume(file)
      }
    } catch (error) {
      console.error(error);

    }
  }

  const handleResumeSelect = (index: number, url: string) => {
    setResumeUrl(index);
    setResumeLink(url)
    setResumeError("")

  };


  useEffect(() => {
    const Jobdetails = async () => {
      try {
        let response = await viewJobdetails(job_id as string);
        if (response?.data) {
          setJob(response.data.jobDetails);
          setLimit(response.data.plan_id.limit)
        }
      } catch (error) {
        console.error(error);
      }
    };
    Jobdetails();
  }, [job_id, updated]);

  const handleJobapply = async (job_id: string, company_id: string) => {
    try {
      if (!resumeLink) {
        setResumeError("Select a resume for applying")
        return
      }
      if (userDatas.plan_id) {
        const jobAppliedCount = userDatas.jobapplied_Count ?? 0;
        if (jobAppliedCount < limit) {
          let response = await jobApply(job_id, company_id, resumeLink);
          if (response?.data?.success) {
            toast.success(response.data.message);
            setUpdated(!updated)
            setShowModal(!showModal)
          } else if (response?.data?.error) {
            toast.error(response.data.error);
          }
        } else {
          toast.error("Reached your daily limit")
        }
      }
      else {
        toast.error("Choose a subscription plan for applying")
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while applying for the job.');
    }
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      setSkelton(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])
  const submitResume = async () => {
    try {
      setButtonload(!buttonLoad)
      if (!userDatas?.resume_url) {
        const formData = new FormData()
        formData.append("image", resume as File)
        formData.append("percentage", "15")
        const response = await uploadResume(formData as any)
        if (response?.data.success) {
          setButtonload(false)
          setResume(undefined)

          setUpdated(!updated)
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          toast.success(response.data.message)
        }
      } else {
        const formData = new FormData()
        formData.append("image", resume as File)
        formData.append("percentage", userDatas?.percentage as string)
        const response = await uploadResume(formData as any)
        if (response?.data.success) {
          setButtonload(false)
          setUpdated(!updated)
          setResume(undefined)

          if (fileInputRef.current) {
            fileInputRef.current.value = '';

          }

          toast.success(response.data.message)
        }
      }

    } catch (error) {
      console.error(error);

    }


  }
  const jobApplication = () => {
    if (userDatas.plan_id) {
      setShowModal(!showModal)
    }
    else {
      toast.error("Choose a subscription plan for applying")

    }
  }

  return (
    <>
      {!skelton ? (<div className='w-full min-h-screen lg:m-11 mb-11 flex flex-col items-center  '>
        <div className='w-full flex flex-col md:flex-row'>
          <div className='flex justify-center md:ml-40 mb-5 md:mb-0'>
            {job?.company_id.img_url ? (
              <img src={job.company_id.img_url} className='w-96 h-auto' alt='' />
            ) : (
              <img src='/imgadd.jpg' className='w-96 h-auto' alt='' />
            )}
          </div>
          <div className='space-y-3 w-full text-center lg:ml-7  md:text-left'>
            <p className='text-3xl font-bold'>{job?.jobtitle}</p>
            <p className='text-xl font-semibold'>{job?.company_id.companyname}</p>
            <div className='flex items-center  justify-center md:justify-start text-gray-400'>
              <FaMapMarkerAlt />
              <p className='ml-2 text-black'>{job?.company_id.city}</p>
            </div>
            <p className=''>{job?.type}</p>
            <p>{job?.location}</p>
            <div className='flex justify-center md:justify-start'>

              {job?.applicants_id?.some((val: any) => userDatas._id === val.user_id) ? ((<button
                className='bg-green-500 cursor-default rounded-full text-white w-24 h-12'
              >
                Applied
              </button>)) :

                (<button
                  // onClick={() => job?._id && handleJobapply(job._id,job.company_id._id as string)}
                  onClick={jobApplication}
                  className='bg-black rounded-full text-white w-24 h-12'
                >
                  Apply
                </button>)
              }
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 sm:w-4/5 md:w-3/4 mt-10 space-y-6 px-4 md:px-0">
          <div>
            <p className='text-lg font-medium'>About Us:</p>
            <p>{job?.company_id.about}</p>
          </div>
          <div>
            <p className='text-lg font-medium'>Job Description:</p>
            <p>{job?.description}</p>
          </div>
          <div>
            <p className='text-lg font-medium'>Key Responsibilities:</p>
            <p>{job?.responsibilities}</p>
          </div>
          <div>
            <p className='text-lg font-medium'>Requirements:</p>
            <p>{job?.requirements}</p>
          </div>
          <div>
            <p className='text-lg font-medium'>Preferred Qualifications:</p>
            <p>{job?.qualification}</p>
          </div>
          <div>
            <p className='text-lg font-medium'>Skills:</p>
            <p>{job?.skills}</p>
          </div>
        </div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>) : (<div className='w-full min-h-screen lg:m-11 mb-11 flex flex-col items-center'>
        <div className='w-full flex flex-col md:flex-row animate-pulse'>
          <div className='flex justify-center md:ml-40 mb-5 md:mb-0'>
            <div className='bg-slate-200 w-96 h-64 rounded-lg'></div>
          </div>
          <div className='space-y-3 w-full text-center lg:ml-7 md:text-left'>
            <div className='h-8 bg-slate-200 rounded w-3/4 mx-auto md:mx-0'></div>
            <div className='h-6 bg-slate-200 rounded w-2/3 mx-auto md:mx-0'></div>
            <div className='flex items-center justify-center md:justify-start'>
              <div className='bg-slate-200 h-5 w-5 rounded-full'></div>
              <div className='h-6 bg-slate-200 rounded w-1/3 ml-2'></div>
            </div>
            <div className='h-5 bg-slate-200 rounded w-1/4 mx-auto md:mx-0'></div>
            <div className='h-5 bg-slate-200 rounded w-1/3 mx-auto md:mx-0'></div>
            <div className='flex justify-center md:justify-start'>
              <div className='h-12 bg-slate-200 rounded-full w-24'></div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 sm:w-4/5 md:w-3/4 mt-10 space-y-6 px-4 md:px-0 animate-pulse">
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/4'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/4'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/3'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/4'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/2'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
          <div>
            <div className='h-6 bg-slate-200 rounded w-1/4'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
            <div className='h-5 bg-slate-200 rounded mt-2 w-full'></div>
          </div>
        </div>
      </div>
      )}
      {showModal &&

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload and Select Your Resume
            </h2>
            <form >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload your resumes:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  accept=".pdf"
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => handlePdf(e)}
                  className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {/* <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-0.5">
                  Upload
                </button> */}
                <button onClick={submitResume} disabled={buttonLoad || !resume} type="submit" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-0.5">

                  {buttonLoad && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>}
                  {buttonLoad ? "Uploading..." : "Upload"}
                </button>
              </div>


              {resumeData && resumeData.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Select a resume:</h3>
                  <div className="space-y-2">
                    {resumeData.map((resume, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start p-2 bg-gray-100 rounded-md"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`resume-${index}`}
                            name="resume"
                            value={index}
                            onChange={() => handleResumeSelect(index, resume)}
                            className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black"
                          />
                          <label
                            htmlFor={`resume-${index}`}
                            className="ml-3 text-sm font-medium text-gray-900"
                          >
                            {`${userDatas.firstname} Resume ${index + 1}`}
                          </label>
                        </div>

                        {resumeUrl === index && (
                          <div className="mt-2 w-full">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Resume Preview:</h3>
                            <iframe
                              src={resume}
                              className="w-full h-64 border border-gray-300 rounded-md"
                              title={`Resume ${index + 1} Preview`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <span className='text-red-500'>{resumeError}</span>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
                  onClick={() => { setShowModal(!showModal), setResumeUrl(undefined) }} >
                  Cancel
                </button>
                <button
                  onClick={() => job?._id && handleJobapply(job._id, job.company_id._id as string)}

                  type="button"
                  className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg  focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      }
    </>
  );
};

export default JobDetails;
