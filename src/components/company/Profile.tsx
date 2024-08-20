import  { ChangeEvent, useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { editProfile, getCompanydata, uploadDocument } from '../../Api/companyApi'
import { Company } from '../../Interface/CompanyInterface'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanydetails } from '../../Redux/CompanySlice'
import { RootState } from '../../Redux/Store'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import { reviews } from '../../Interface/UserInterface'
import { getReviews } from '../../Api/companyApi'

const Profile = () => {
  let [data, setData] = useState<Company>()
  const [imageFile, setImageFile] = useState<any>()
  const dispatch = useDispatch()
  const [openmodal, setOpenmodal] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [document,setDocument]=useState<File>()
  const [reviewData, setReviewData] = useState<reviews[]>()
  const [count, setCount] = useState<number[]>([])

  const companyDatas: Company = useSelector((state: RootState) => state.company)
  useEffect(() => {
    const companyData = async () => {
      try {
        let response = await getCompanydata()
        if (response?.data.success) {
          console.log(response?.data.companydata,"dsd");
          if(!response?.data.companydata.document_url){           
            setShowModal(true)
          }
          dispatch(setCompanydetails(response?.data.companydata))
          setImageFile(companyDatas.img_url)

        }
      } catch (error) {
        console.error(error);

      }
    }
    companyData()
  }, [dispatch,openmodal])
  useEffect(() => {
    if (companyDatas) {
      setData(companyDatas)
    }
  }, [companyDatas])
  useEffect(()=>{
    const reviews = async () => {
      try {
        const response = await getReviews()
        if (response?.data.success) {
          console.log(response?.data, "ddd");

          setReviewData(response.data.reviews.review)
          setCount(response.data.reviews.counts)


        }
      } catch (error) {
        console.error(error);

      }
    }
    reviews()
  },[])
  // useEffect(()=>{
  //   if(!data?.document_url){
  //     console.log(data?.document_url,"ddd");
      
  //     setShowModal(true)
  //   }
  // },[])
  const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
    initialValues: {
      companyname: companyDatas.companyname || '',
      city: companyDatas.city || '',
      industry: companyDatas.industry || '',
      address: companyDatas.address || '',
      about: companyDatas.about || '',
      website_url: companyDatas.website_url ||'',
    }, onSubmit: async (formData:any) => {
     try {
       
       const formDataToSend = new FormData();
       Object.keys(formData).forEach(key => {
         formDataToSend.append(key, formData[key]);
        });
        
        formDataToSend.append("image", imageFile);

      const token = localStorage.getItem("Companytoken")
      let response = await editProfile(formDataToSend as any, token as string)
      if (response?.data.success) {
        setOpenmodal(!openmodal)
        dispatch(setCompanydetails(response.data.commentData))
      }
     } catch (error) {
      console.error(error);
      
     }
    }
  })
  const handleEdit = () => {
    setOpenmodal(!openmodal)
  }
  const handleimage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      // setPreviewUrl(URL.createObjectURL(file));
    }
  }
  const handleDocument = (e:ChangeEvent<HTMLInputElement>)=>{
    try {
      if (e.target.files && e.target.files.length > 0) {
        let file = e.target.files[0];
        setDocument(file);}
    } catch (error) {
      console.error(error);
      
    }
  }
  const submitDocument =async()=>{
    try {
      const formData = new FormData()
      formData.append("image",document as File)
      let response = await uploadDocument(formData as any)
      if(response?.data){
        toast.success(response.data.messsage)
        setShowModal(false)
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <>
      <div className='w-screen h-auto min-h-screen flex  flex-col justify-center sm:justify-center sm:w-auto items-center  '>
        <div className='bg-black text-white flex flex-row s:w-auto lg:w-3/4 1/2 h-auto mt-20 rounded-2xl  '>
          <div className='lg:w-1/4 h-auto  lg:content-center sm:w-1/2 sm:h-1/2  md:content-center'>

          {data?.img_url ? (
              <img src={data?.img_url} className='ml-4 mt-4' alt="Default Image" />
            ) : (
              <img src='../public/imgadd.jpg' className='ml-4 mt-4 items-center' alt="User Image" />
            )}          </div>
          <div className='border-7 ml-28 '>
            <ul className='space-y-6 '>
              <li className='text-2xl font-bold mt-8'>{data?.companyname}</li>
              <li className='flex flex-row'> <FaMapMarkerAlt />   : {data?.city} </li>
              <li>{data?.industry}</li>

              <li>Address:{data?.address}</li>
              <li>About:{data?.about}</li>
              {/* <li >Address:dssssssssssss</li> */}
              <li>Gmail:{data?.email}</li>
              <li>Phone:{data?.phonenumber}</li>
              <li>Website:{data?.website_url}</li>
            </ul>
          </div>
          <div className='border-7 ml-96   mt-12'>
            <button data-modal-target="crud-modal" onClick={handleEdit} data-modal-toggle="crud-modal" className='text-white font-bold ml-11'>Edit</button>
          </div>
        </div>


        <div className='w-full flex justify-center items-center  '>
          <div className='rounded-2xl flex flex-col  w-3/4 m-9 h-auto shadow-xl p-6 bg-white'>

            <div className=' m-6'>
              <div className=''>
                <p className='text-2xl font-semibold'>Reviews & Ratings</p>
              </div>
              {/* <div className='flex justify-end'>
                {!userExists && <button onClick={() => setReviewModal(!reviewModal)} className='h-12 w-28 rounded-xl  bg-black text-white'>Write review</button>
                }      </div> */}

              {/* <div className="flex items-center mb-2">
    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div> */}
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{reviewData?.length} global ratings</p>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: count && count.length > 0 ? `${count[0]}px` : '0px' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{count && count.length > 0 ? `${count[0]}%` : '0%'}</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: count && count.length > 0 ? `${count[1]}px` : '0px' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{count && count.length > 0 ? `${count[1]}%` : '0'}</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: count && count.length > 0 ? `${count[2]}px` : '0px' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{count && count.length > 0 ? `${count[2]}%` : '0%'}</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: count && count.length > 0 ? `${count[3]}px` : '0px' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{count && count.length > 0 ? `${count[3]}%` : '0%'}</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: count && count.length > 0 ? `${count[4]}px` : '0px' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{count && count.length > 0 ? `${count[4]}%` : '0%'}</span>
              </div>


              {reviewData && reviewData.length > 0 ? reviewData.map((values) => {
                return (<><div className='w-full bg-gray-50 mt-11 space-y-1 '>
                  <div className='flex flex-row space-x-6 items-center'>
                    {values.user_id?.img_url ? <img src={values.user_id?.img_url} alt="" className='w-9 rounded-full' /> : <img src="/user06.png" alt="" className='w-9' />}
                    <p className='text-center'>{values.user_id?.firstname}</p>
                  </div>

                  <div className="flex ml-14 items-center ">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <button
                        type="button"
                        key={star}

                        className={` w-5 h-5 ${index < values.rating_count ? 'text-yellow-300' : 'text-gray-300'
                          } ms-1`}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </button>
                    ))}
                    <p className='ml-9'>{formatDistanceToNow(new Date(values.time as string), { addSuffix: true })}</p>

                  </div>
                  <div className='ml-16'>
                    <p>{values.review}</p>
                  </div>


                </div></>)
              }) : (<>
                <div className='flex justify-center items-center h-20'>
                  <p className='font-medium text-xl'>Reviews not found</p>
                </div>
              </>)}
            </div>
            <div >


            </div>
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
                    <input onChange={handleimage} accept="image/*"  type="file" name="img_url" id="profilePicture" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Companyname</label>
                      <input onChange={handleChange} onBlur={handleBlur} type="text" value={values.companyname} name="companyname" id="companyname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter company name" />
                      {touched.companyname && errors.companyname ? <div className="text-red-500 text-sm"></div> : null}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Location</label>
                      <input onChange={handleChange} type="text" value={values.city} name="city" id="state" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter location" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Industry</label>
                      <input onChange={handleChange} type="text" value={values.industry} name="industry" id="industry" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter industry" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Address</label>
                      <input onChange={handleChange} type="text" value={values.address} name="address" id="address" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter address" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">About</label>
                      <input onChange={handleChange} type="text" value={values.about} name="about" id="about" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter about" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">Website URL</label>
                      <input onChange={handleChange} type="text" value={values.website_url} name="website_url" id="website_url" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter website URL" />
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
        {showModal &&(<>
          <div id="popup-modal" className="fixed inset-0 bg-gray-700/50 z-50 flex justify-center items-center">
      <div className="relative w-1/2 max-w-[50%] max-h-[90%] p-4">
          <div className="relative bg-white rounded-lg shadow">
              {/* <button 
                  type="button" 
                  className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center" 
                  data-modal-hide="popup-modal"
                  onClick={() => setOpenmodal(false)} // Ensure you have this function to close the modal
              >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
              </button> */}
              <div className="p-6 text-center space-y-7">
                  <h3 className="mb-5 font-semibold text-black text-2xl">Welcome to JobOrbit</h3>
                  <p>For Verification provide your valuable documents</p>
                  <div className="flex  justify-center">
                      <input 
                          type="file" 
                          accept='.pdf' 
                          onChange={(e) => handleDocument(e)} 
                          className="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-primary-500"
                      />
                  </div>
                  <button className='bg-black text-white w-24 h-10 rounded-lg mt-4' onClick={submitDocument}>
                      Submit
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
