import React, { useEffect, useRef, useState } from 'react'
import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'
import { experienceData, User } from '../../Interface/UserInterface'
import { useFormik } from 'formik'
import { addExperience, addSkills, appliedJobs, editProfile, getUserdata, uploadResume } from '../../Api/userApi'
import { setUserdetails } from '../../Redux/UserSlice'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { jobdata } from '../../Interface/CompanyInterface'
import { ProfileSchema } from '../../Validations/User/Loginvalidation'

const Profile = () => {
  const [data, setData] = useState<User>()
  const [imageFile, setImageFile] = useState<any>()
  const [openmodal, setOpenmodal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [experienceError, setExperienceerror] = useState<string>('')
  const [experiencemodal, setExperiencemodal] = useState<boolean>(false)
  const [experiencefield, setExperiencefield] = useState<string>('')
  const [startdate, setStartdate] = useState<string>('')
  const [enddate, setEnddate] = useState<string>('')
  const [responsibilities, setResponsibilities] = useState<string>('')
  const userDatas: User = useSelector((state: RootState) => state.user)
  const [load, setLoad] = useState<boolean>(false)
  const [skills, setSkills] = useState([])
  const [updated, setUpdated] = useState<boolean>(false)
  const [textareaValue, setTextareaValue] = useState('');
  const [resume, setResume] = useState('')
  const [showApplied, setShowApplied] = useState<boolean>(false)
  const [appliedJobdata, setAppliedJobdata] = useState<jobdata[]>()
  const [mode, setMode] = useState('')
  const [skillerror, setSkillerror] = useState('')
  const [uploaderror, setUploaderror] = useState('')
  const [error, setError] = useState({});
  const navigate = useNavigate()

  const fileInputRef = useRef();

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

  }, [dispatch, updated])
  useEffect(() => {
    setData(userDatas);
  }, [dispatch, openmodal, experiencemodal, updated, userDatas]);

  useEffect(() => {

    const applied = async () => {
      try {

        let response = await appliedJobs()
        if (response?.data.success) {
          setAppliedJobdata(response?.data.appliedJobs)
        }


      } catch (error) {
        console.error(error);

      }
    }
    applied()
  }, [])

  const handleEdit = () => {
    setOpenmodal(!openmodal)
  }
  const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
    initialValues: {
      firstname: userDatas.firstname || '',
      lastname: userDatas.lastname || '',
      field: userDatas.field || '',
      location: userDatas.location || '',
      github_url: userDatas.github_url || '',
      portfolio_url: userDatas.portfolio_url || '',
      about: userDatas.about || '',
      qualification: userDatas.qualification || '',
      img_url: ''


    }, validationSchema: ProfileSchema, onSubmit: async (formData: any) => {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        if (imageFile) {
          if (!data?.img_url) {
            formDataToSend.append("image", imageFile);
            formDataToSend.append("percentage", "15")
          } else {
            formDataToSend.append("percentage", data?.percentage)
          }
        }

        let response = await editProfile(formDataToSend as any)
        if (response?.data.success) {
          setOpenmodal(!openmodal)
          dispatch(setUserdetails(response.data.userData))
        }

      } catch (error) {
        console.error(error);

      }
    }
  })
  const handleimage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      // setPreviewUrl(URL.createObjectURL(file));
    }
  }
  const validateForm = () => {
    const errors = {};
    if (!experiencefield) errors.experiencefield = 'Experience Field is required';
    if (!mode) errors.mode = 'Duration is required';
    if (!startdate) errors.startdate = 'Joined Date is required';
    if (mode === 'Past' && !enddate) {
      errors.enddate = 'End Date is required';
    } else if (mode === 'Past' && startdate && enddate && new Date(startdate) >= new Date(enddate)) {
      errors.enddate = 'End Date should be greater than Start Date';
    }
    if (!responsibilities) errors.responsibilities = 'Responsibilities are required';
    return errors;
  };
  const handleExperience = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {

      const experienceData = { experiencefield: experiencefield, start_date: startdate, end_date: enddate, mode: mode, responsibilities: responsibilities, percentage: data?.percentage }
      if (data?.experience.length == 0) {
        let percentage = "15"
        experienceData.percentage = percentage
        let response = await addExperience(experienceData as experienceData)
        if (response?.data.success) {
          setUpdated(!updated)
          setExperiencemodal(!experiencemodal)
        }
      } else {
        let percentage = data?.percentage
        experienceData.percentage = percentage
        let response = await addExperience(experienceData as experienceData)
        if (response?.data.success) {
          setUpdated(!updated)
          setExperiencemodal(!experiencemodal)
        }

      }
    }
    else { setError(formErrors); }
  }
  const handleskills = async (e: any) => {
    let inputValue = e.target.value
    inputValue.trim()
    setTextareaValue(inputValue);
    setSkillerror('')

    const skill = inputValue.split(',').map(val => val.trim())

    setSkills(skill)
  }
  const submitSkills = async (e) => {
    if (skills.length == 0) {
      setSkillerror("Enter your skills")
      e.preventDefault()
      return
    }
    e.preventDefault()
    try {
      if (data?.skills?.length == 0) {

        const percentage = 15
        const response = await addSkills(skills as [], percentage as number)
        if (response?.data) {
          setUpdated(!updated)
          toast.success(response.data.message)
          setTextareaValue('');
          setSkills([]);
        }
      }
      else {
        const percentage = Number(data?.percentage)
        const response = await addSkills(skills as [], percentage as number)
        if (response?.data) {
          setUpdated(!updated)
          toast.success(response.data.message)
          setTextareaValue('');
          setSkills([]);
        }
      }

    } catch (error) {
      console.error(error);

    }

  }

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setLoad(!load)
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, [])

  const handlePdf = (e: Event) => {
    try {
      let file = e.target.files[0]
      setResume(file)
      setUploaderror('')
    } catch (error) {
      console.error(error);

    }
  }
  const submitPdf = async () => {

    if (resume.length === 0) {
      console.log("hello");

      setUploaderror("Upload your cv")
      return
    }
    try {
      if (!data?.resume_url) {
        const formData = new FormData()
        formData.append("image", resume)
        formData.append("percentage", "15")
        const response = await uploadResume(formData)
        if (response?.data) {
          setUploaderror('')
          setResume('')

          setUpdated(!updated)
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          toast.success(response.data.message)
        }
      } else {
        const formData = new FormData()
        formData.append("image", resume)
        formData.append("percentage", data?.percentage)
        const response = await uploadResume(formData)
        if (response?.data) {
          setUpdated(!updated)
          setUploaderror('')
          setResume('')

          if (fileInputRef.current) {
            console.log(fileInputRef.current.value);

            fileInputRef.current.value = '';

          }

          toast.success(response.data.message)
        }
      }

    } catch (error) {
      console.error(error);

    }
  }
  return (
    <>
{/* 
      {load &&
        <div className=' flex justify-center items-center min-h-screen'>


          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-96 mb-6"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[500px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[430px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[460px]"></div>
          </div>
        </div>
      } */}
      {load == false &&
      <div className='w-full h-auto flex flex-col items-center min-h-screen sm:justify-center'>
          <div className='shadow-2xl rounded-3xl flex flex-col sm:flex-col md:flex-row md:w-full lg:flex-row p-9 text-white sm:w-full lg:w-4/5 h-auto mb-11 lg:mt-20 sm:mt-0'>
            <div className='lg:w-1/4 h-auto md:w-full  lg:content-center sm:w-full sm:h-1/2  md:content-center  mt-20'>

              {data?.img_url ? (
                <img src={data?.img_url} className='lg:ml-4 sm:ml-0 mt-4 rounded-3xl ' alt="Default Image" />
              ) : (<>
                <img src='../public/imgadd.jpg' className='lg:ml-4 sm:ml-0 mt-4 items-center' alt="User Image" />
                <p className='text-red-500 font-medium pl-8'>Add image and increase 15% profile percentage</p>
              </>
              )}
            </div>
            <div className='border-7 lg:ml-28  sm:ml-0'>
              <ul className='space-y-6 text-black font-medium'>
                <li className='text-3xl font-extrabold mt-8 '>{data?.firstname} {data?.lastname}</li>
                <li className=''>{data?.field}</li>
                <li className='flex flex-row text-black'> <FaMapMarkerAlt className='text-gray-500 mr-1 mt-1' />   : {data?.location} </li>
                <li className=''>About:{data?.about}</li>
                <li className=''>Gmail:{data?.email}</li>
                <li>Phone:{data?.phonenumber}</li>
                <li>Portfolio:
                  <a href={`http://www.${data?.portfolio_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
                    {data?.portfolio_url}
                  </a></li>
                <li>Git_hub:
                  <a href={`http://www.${data?.github_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
                    {data?.github_url}
                  </a></li>

                {!data?.github_url && (<>
      /            <div className=''>
                    <p className='text-red-500'>Complete your details increase 15% profile percentage</p>
                  </div>

                </>)}
              </ul>
            </div>
            <div className='border-7 lg:ml-28 sm:ml-0  mt-28'>
              <ul className='text-black font-medium'>
                <li className='font-bold'>Education:</li>
                <li>{data?.qualification}</li>
              </ul>
            </div>
            <div className='border-7 lg:ml-28 sm:ml-0 md:ml-0 mt-28'>
              <ul className='text-black font-medium'>
                <li className='font-bold'>Skills:</li>
                {data?.skills?.length > 0 ? (
                  data.skills.map((val, index) => (
                    <li key={index}>{val}</li>
                  ))
                ) : (
                  <p className='text-gray-500 '>Add your skills</p>
                )}
              </ul>
            </div>

            <div className='border-7 lg:ml-32 sm:ml-0 md:ml-0  mt-12'>
              {/* <FaGithub onClick={() => { data?.github_url ? `http://${data?.github_url}` : '' }} className='text-black w-9 h-16' /> */}
              <button onClick={() => {
                if (data?.resume_url) {
                  window.open(data.resume_url, '_blank');
                }
              }} className='border-2 border-black w-24 h-7 font-semibold text-black  rounded-2xl'>Resume</button>
              <button onClick={handleEdit} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className='text-black font-bold ml-11'>Edit</button>
            </div>
          </div>

          <div className="w-1/2 mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-orange-600 h-2.5 rounded-full"
              style={{ width: `${data?.percentage}%` }}
            > </div>
            <div className='flex justify-end'>
              <p>{data?.percentage}%</p>

            </div>
          </div>
          <div className='mt-6'>
            <button onClick={() => setShowApplied(!showApplied)} className='bg-black text-white w-56 rounded-full h-11'>View Applied jobs</button>

          </div>
          <div className='w-full flex justify-center  items-center '>
            <div className='rounded-2xl flex flex-col  w-3/4 m-9 h-auto shadow-xl p-6 bg-white'>
              <div className='m-6'>
                <div className='space-y-3'>
                  <p className='text-2xl font-semibold'>Skills</p>
                </div>
                <div >

                  <div className='flex flex-col space-y-2 '>
                    <div className='grid grid-cols-10 gap-x-7 gap-y-3 '>
                      {data?.skills && data?.skills?.length > 0 ? (
                        data.skills.map((val, index) => (
                          <p className='rounded-xl bg-orange-200 w-full text-center'>{val}</p>
                        ))
                      ) : (
                        <div className='col-span-10'>

                          <p className='text-red-500 font-medium'>Add your skills and increase 15% profile percentage</p>
                        </div>
                      )}
                    </div>
                    <textarea value={textareaValue} className='w-full h-24 border-black bg-gray-100 border-9 ' onChange={(e) => handleskills(e)} placeholder='Add your skills here' required />
                    <span className='text-red-500'>{skillerror}</span>


                    <div>
                      <button
                        type='button' // Ensure button type is 'button' to prevent form submission
                        onClick={(e) => submitSkills(e)}
                        className='disabled bg-black text-white w-16 h-9'
                      >
                        Add
                      </button>                    </div>
                  </div>
                </div>
              </div>
              <div className='m-6'>
                <div className='space-y-3'>
                  <p className='text-2xl font-semibold'>Upload Resume</p>
                </div>
                <div >

                  <div className='flex flex-col space-y-2 '>
                    {!data?.resume_url && (
                      <>
                        <p className='text-red-500 font-medium'>Add your resume and increase 15% profile percentage</p>

                      </>
                    )}
                    <input type='file' accept=".pdf" ref={fileInputRef} onChange={(e) => handlePdf(e)} className='w-full h-14 border-black bg-gray-100 border-9 ' placeholder='Add your skills here' />
                    <span className='text-red-500'>{uploaderror}</span>

                    <div>
                      <button onClick={submitPdf} className='bg-black text-white w-16 h-9'>Upload</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' m-6'>
                <div className=''>
                  <p className='text-2xl font-semibold'>Experience</p>
                  <button className='font-medium text-gray-400 ' onClick={() => setExperiencemodal(!experiencemodal)}>Add experience</button>
                </div>
                <div className=' grid lg:grid-cols-2 sm:grid-rows-1 sm:gap-x-0 lg:gap-x-4 h-auto' >
                {data && data?.experience.length > 0 ? data.experience.map((val) => {
                     const startDate = format(new Date(val.start_date), 'MMMM dd, yyyy');
                     const endDate = val.mode === "Present" ? "Present" : format(new Date(val.end_date), 'MMMM dd, yyyy');
                    return (
                      <div className='rounded-3xl border-9 h-auto bg-gray-100 mt-9 p-5'>
                        <div className='flex justify-end space-x-3'>
                          {/* <MdEdit className='h-12 w-7' />
              <MdDelete className='h-12 w-7'/> */}
                        </div>
                        <div className='flex flex-col space-y-6'>
                          <p className='text-2xl font-semibold text-center md:text-left break-words'>
                            {val.experiencefield}
                          </p>
                          <div className='space-y-4'>
                            <p className='text-xl font-normal'>Start Date: {startDate}</p>
                            <p className='text-xl font-normal'>End Date: {endDate}</p>
                            {/* <p>{val.mode}</p> */}
                          </div>
                          <div>
                            <p className='text-xl font-medium'>Responsibilities:</p>
                            <p className='break-words'>
                              {val.responsibilities}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div>
                      <p className='text-red-500 font-medium'>Add your experience and increase 15% profile percentage</p>
                    </div>
                  )}

                </div>

              </div>
              <div >


              </div>
            </div>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </div>




        </div>}
      {
        openmodal && (


          <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold dark:text-black">
                    Edit Profile
                  </h3>
                  <button onClick={() => setOpenmodal(!openmodal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5" >
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-black ">Profile Picture</label>
                    <input onChange={handleimage} type="file" accept="image/*" name="img_url" id="profilePicture" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                    {touched.img_url && errors.img_url ? <div className="text-red-500 text-sm">{errors.img_url}</div> : null}

                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Firstname</label>
                      <input onChange={handleChange} onBlur={handleBlur} type="text" value={values.firstname} name="firstname" id="firstname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter first name" />
                      {touched.firstname && errors.firstname ? <div className="text-red-500 text-sm">{errors.firstname}</div> : null}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Lastname</label>
                      <input onChange={handleChange} type="text" value={values.lastname} name="lastname" id="lastname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter last name" />
                      {touched.lastname && errors.lastname ? <div className="text-red-500 text-sm">{errors.lastname}</div> : null}

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Field</label>
                      <input onChange={handleChange} type="text" value={values.field} name="field" id="field" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter field" />
                      {touched.field && errors.field ? <div className="text-red-500 text-sm">{errors.field}</div> : null}

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Location</label>
                      <input onChange={handleChange} type="text" value={values.location} name="location" id="location" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter location" />
                      {touched.location && errors.location ? <div className="text-red-500 text-sm">{errors.location}</div> : null}

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">GitHub URL</label>
                      <input onChange={handleChange} type="text" value={values.github_url} name="github_url" id="github_url" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter GitHub URL" />
                      {touched.github_url && errors.github_url ? <div className="text-red-500 text-sm">{errors.github_url}</div> : null}

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Portfolio URL</label>
                      <input onChange={handleChange} type="text" value={values.portfolio_url} name="portfolio_url" id="portfolio_url" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter portfolio URL" />
                      {touched.portfolio_url && errors.portfolio_url ? <div className="text-red-500 text-sm">{errors.portfolio_url}</div> : null}

                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-black">About:</label>
                      <textarea onChange={handleChange} id="about" value={values.about} name="about" className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write about yourself"></textarea>
                      {touched.about && errors.about ? <div className="text-red-500 text-sm">{errors.about}</div> : null}

                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-black">Education</label>
                      <input onChange={handleChange} type="text" value={values.qualification} name="qualification" id="qualification" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your education" />
                      {touched.qualification && errors.qualification ? <div className="text-red-500 text-sm">{errors.qualification}</div> : null}

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
      {experiencemodal && (<>
        <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold dark:text-black">
                  Add experience
                </h3>
                <button onClick={() => setExperiencemodal(!experiencemodal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Experience Field</label>
                    <textarea required onChange={(e) => { setExperiencefield(e.target.value) }} name="experiencefield" id="experiencefield" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter experiencefield" />
                    {error.experiencefield && <p className="text-red-500 text-sm">{error.experiencefield}</p>}
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Duration</label>
                    <select onChange={(e) => { setMode(e.target.value) }} name="duration" id="duration" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Past">Past</option>
                    </select>
                    {error.mode && <p className="text-red-500 text-sm">{error.mode}</p>}
                  </div>
                  {(mode === "Present" || mode === "Past") && (
                    <div className="sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Joined Date</label>
                      <input type='date' required onChange={(e) => { setStartdate(e.target.value) }} name="duration" id="duration" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                      {error.startdate && <p className="text-red-500 text-sm">{error.startdate}</p>}
                    </div>
                  )}
                  {mode == "Past" && (
                    <div className="sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">End Date</label>
                      <input type='date' required onChange={(e) => { setEnddate(e.target.value) }} name="duration" id="duration" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                      {error.enddate && <p className="text-red-500 text-sm">{error.enddate}</p>}
                    </div>
                  )}
                  <div className="sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-black">Responsibilities</label>
                    <textarea required onChange={(e) => { setResponsibilities(e.target.value) }} name="responsibilities" id="responsibilities" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter responsibilities" />
                    {error.responsibilities && <p className="text-red-500 text-sm">{error.responsibilities}</p>}
                  </div>
                </div>
                <button type="button" onClick={handleExperience} className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

      </>)}
      {showApplied && (<>
        <div id="popup-modal" className="fixed inset-0 bg-gray-700/50 z-50 flex justify-center items-center">
          <div className="relative w-1/2 max-w-[50%] max-h-[90%] p-4">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                data-modal-hide="popup-modal"
                onClick={() => setShowApplied(!showApplied)}// Ensure you have this function to close the modal
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center space-y-7">
                <h3 className="mb-5 font-semibold text-black text-2xl">Applied Jobs</h3>
                {appliedJobdata && appliedJobdata.length > 0 ? appliedJobdata.map((values, index) => {
                  return (<>
                    <div className="flex justify-center overflow-y">
                      <div className="w-full max-w-6xl p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 font-medium">
                          <div className="flex items-center justify-center">{index + 1}</div>
                          <div className="flex items-center justify-center">{values.jobtitle}</div>
                          <div className="flex items-center justify-center">{values.company_id.companyname}</div>
                          <div className="flex items-center justify-center">View More</div>
                          <div className="flex items-center justify-center">Status</div>
                          <div className="flex items-center justify-center">Time</div>
                        </div>
                      </div>
                    </div>


                  </>)
                }) : (<>
                  <p>No applied jobs found</p></>)}

                <button onClick={() => setShowApplied(!showApplied)} className='bg-black text-white w-24 h-10 rounded-lg mt-4' >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>


      </>)}
    </>
  )
}

export default Profile
