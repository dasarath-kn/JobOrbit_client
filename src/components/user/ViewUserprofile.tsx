import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { findUser } from '../../Api/userApi';
import { User } from '../../Interface/UserInterface';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ViewUserprofile = () => {
    const location =useLocation()
    const {id}=location.state
    const [userdata,setUserdata]=useState<User>()
    useEffect(()=>{
        const user =async()=>{
            try {
                const response = await findUser(id)
                if(response?.data.success){
                    setUserdata(response.data.userData)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        user()
    },[])
    
  return (
   <>
     <div className='w-full h-auto flex sm:justify-center sm:w-full flex-col  min-h-screen  items-center  '>

<div className='shadow-2xl rounded-3xl p-9 text-white flex flex-row sm:w-full lg:w-4/5 1/2 h-auto mb-11 mt-20   '>
  <div className='lg:w-1/5 h-auto   lg:content-center sm:w-1/2 sm:h-1/2  md:content-center '>

    {userdata?.img_url ? (
      <img src={userdata?.img_url} className='ml-4 mt-4 rounded-3xl ' alt="Default Image" />
    ) : (<>
      <img src='../public/user06.png' className='p-9 mt-9' alt="User Image" />
    </>
    )}
  </div>
  <div className='border-7 ml-28 '>
    <ul className='space-y-6 text-black font-medium'>
      <li className='text-3xl font-extrabold mt-8 '>{userdata?.firstname} {userdata?.lastname}</li>
      <li className=''>{userdata?.field}</li>
      <li className='flex flex-row text-black'> <FaMapMarkerAlt className='text-gray-500' />   : {userdata?.location} </li>
      <li className=''>About:{userdata?.about}</li>
      <li className=''>Gmail:{userdata?.email}</li>
      <li>Phone:{userdata?.phonenumber}</li>
      <li>Portfolio:
        <a href={`http://www.${userdata?.portfolio_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
          {userdata?.portfolio_url}
        </a></li>
      <li>Git_hub:
        <a href={`http://www.${userdata?.github_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
          {userdata?.github_url}
        </a></li>

     
    </ul>
  </div>
  <div className='border-7 ml-28  mt-28'>
    <ul className='text-black font-medium'>
      <li className='font-bold'>Education:</li>
      <li>{userdata?.qualification}</li>
    </ul>
  </div>
  <div className='border-7 ml-28 mt-28'>
    <ul className='text-black font-medium'>
      <li className='font-bold'>Skills:</li>
      {userdata && userdata.skills && userdata?.skills?.length > 0 ? (
        userdata.skills.map((val, index) => (
          <li key={index}>{val}</li>
        ))
      ) : (
        <p className='text-gray-500 '>Add your skills</p>
      )}
    </ul>
  </div>


</div>


   
{userdata && userdata?.experience.length>0 &&
<div className='w-full flex justify-center items-center '>
  <div className='rounded-2xl flex flex-col  w-3/4 m-9 h-auto shadow-xl p-6 bg-white'>
   
    <div className=' m-6'>
      <div className=''>
        <p className='text-2xl font-semibold'>Experience</p>
      </div>
      <div className=' grid grid-cols-2 gap-x-4 h-auto' >
        { userdata && userdata?.experience.length > 0 ? userdata?.experience.map((val) => {
          return (<>

            <div className='rounded-3xl border-9 h-auto bg-gray-100 mt-9  p-5'>
              <div className='flex justify-end  space-x-3 border-9'>
                {/* <MdEdit className='h-12 w-7' />
<MdDelete className='h-12 w-7'/> */}
              </div>
              <div className='flex flex-col space-y-6'>
                <p className='text-2xl font-semibold text-center md:text-left break-words'>
                  {val.experiencefield}
                </p>

                <div>
                  <p className='text-xl font-medium'>Duration:</p>
                  <p>
                    {val.duration}
                  </p>
                </div>
                <div>
                  <p className='text-xl font-medium'>Responsibilities:</p>
                  <p className='break-words'>
                    {val.responsibilities}
                  </p>
                </div>
              </div>
            </div></>)
        }) : <div className=''>

        </div>
        }

      </div>

    </div>
    <div >


    </div>
  </div>
 
</div>
}




</div>
   </>
  )
}

export default ViewUserprofile