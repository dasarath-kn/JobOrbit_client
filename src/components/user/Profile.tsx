import React, {  useEffect, useState } from 'react'
import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'
import { User } from '../../Interface/UserInterface'
import { useFormik } from 'formik'
import { editProfile } from '../../Api/userApi'
import { setUserdetails } from '../../Redux/UserSlice'

const Profile = () => {
  const [data, setData] = useState<User>()
  const [imageFile, setImageFile] = useState<any>()
  const [openmodal, setOpenmodal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const userDatas: User = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const companyData = async () => {
      try {

        setData(userDatas)

      } catch (error) {
        console.error(error);

      }
    }
    companyData()
  }, [dispatch,openmodal])

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


    }, onSubmit: async (formData: any) => {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        formDataToSend.append("image", imageFile);
        const token = localStorage.getItem("Usertoken")
        let response = await editProfile(formDataToSend as any, token as string)
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
  return (
    <>
      <div className='w-screen h-screen flex  flex-col   sm:w-auto items-center  '>
        <div className='shadow-2xl rounded-3xl text-white flex flex-row s:w-auto lg:w-3/4 1/2 h-auto mt-20   '>
          <div className='lg:w-1/4 h-auto  lg:content-center sm:w-1/2 sm:h-1/2  md:content-center'>

            {data?.img_url ? (
              <img src={data?.img_url} className='ml-4 mt-4' alt="Default Image" />
            ) : (
              <img src='../public/imgadd.jpg' className='ml-4 mt-4 items-center' alt="User Image" />
            )}
          </div>
          <div className='border-7 ml-28 '>
            <ul className='space-y-6 text-black font-medium'>
              <li className='text-3xl font-extrabold mt-8 '>{data?.firstname} {data?.lastname}</li>
              <li className=''>{data?.field}</li>
              <li className='flex flex-row text-black'> <FaMapMarkerAlt className='text-gray-500' />   : {data?.location} </li>
              <li className=''>About:{data?.about}</li>
              {/* <li >Address:dssssssssssss</li> */}
              <li className=''>Gmail:{data?.email}</li>
              <li>Phone:{data?.phonenumber}</li>
              <li>Portfolio:
                <a href={`http://www.${data?.portfolio_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
                  {data?.portfolio_url}
                </a></li>
            </ul>
          </div>
          <div className='border-7 ml-28  mt-28'>
            <ul className='text-black font-medium'>
              <li>Education:</li>
              <li>{data?.qualification}</li>
            </ul>
          </div>
          <div className='border-7 ml-28  mt-28'>
            <ul className='text-black font-medium'>
              <li>Skills:</li>
              <li>{data?.skills}</li>
            </ul>
          </div>
          <div className='border-7 ml-32  mt-12'>
            <FaGithub onClick={() => { data?.github_url ? `http://${data?.github_url}` : '' }} className='text-black w-9 h-16' />
            <button className='border-2 border-black w-24 h-7 font-semibold text-black  rounded-2xl'>Resume</button>
            <button onClick={handleEdit} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className='text-black font-bold ml-11'>Edit</button>
          </div>
        </div>
      </div>
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
                    <input onChange={handleimage} type="file" name="img_url" id="profilePicture" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Firstname</label>
                      <input onChange={handleChange} onBlur={handleBlur} type="text" value={values.firstname} name="firstname" id="firstname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter first name" />
                      {touched.firstname && errors.firstname ? <div className="text-red-500 text-sm"></div> : null}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Lastname</label>
                      <input onChange={handleChange} type="text" value={values.lastname} name="lastname" id="lastname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter last name" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Field</label>
                      <input onChange={handleChange} type="text" value={values.field} name="field" id="field" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter field" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Location</label>
                      <input onChange={handleChange} type="text" value={values.location} name="location" id="location" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter location" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">GitHub URL</label>
                      <input onChange={handleChange} type="text" value={values.github_url} name="github_url" id="github_url" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter GitHub URL" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Portfolio URL</label>
                      <input onChange={handleChange} type="text" value={values.portfolio_url} name="portfolio_url" id="portfolio_url" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter portfolio URL" />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-black">About:</label>
                      <textarea onChange={handleChange} id="about" value={values.about} name="about" className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write about yourself"></textarea>
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-black">Education</label>
                      <input onChange={handleChange} type="text" value={values.qualification} name="qualification" id="qualification" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your education" />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-black dark:text-white">Category</label>
                      <select multiple onChange={handleChange} id="category" name="category" className="bg-gray-400 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>Select Skills</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="Javascript">Javascript</option>
                        <option value="Nodejs">Nodejs</option>
                        <option value="Mongodb">Mongodb</option>
                        <option value="Sql">Sql</option>
                        <option value="Python">Python</option>
                      </select>
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
    </>
  )
}

export default Profile
