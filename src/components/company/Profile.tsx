import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getCompanydata } from '../../Api/companyApi'
import { Company } from '../../Interface/CompanyInterface'

const Profile = () => {
  let [data,setData] =useState<Company>()
  useEffect(()=>{
    const companyData =async()=>{
      try {
         let response = await getCompanydata()
         if(response?.data.success){
          console.log(response.data);
          
          setData(response?.data.companydata)
         }
      } catch (error) {
        console.error(error);
        
      }
    }
    companyData()
  },[])
console.log(data);

  return (
    <>
      <div className='w-screen h-screen flex  flex-col justify-center sm:justify-center sm:w-auto items-center  '>
        <div className='bg-black text-white flex flex-row s:w-auto lg:w-3/4 1/2 h-auto mt-20 rounded-2xl  '>
          <div className='lg:w-1/2 h-auto lg:content-center sm:w-1/2 sm:h-1/2  md:content-center'>

            <img src="/landingpage1.png " className='' alt="" />
          </div>
          <div className='border-7 ml-28 '>
            <ul className='space-y-6 '>
              <li className='text-2xl font-bold mt-8'>{data?.companyname}</li>
              <li className='flex flex-row'> <FaMapMarkerAlt  />   : {data?.city} </li>
              <li>{data?.industry}</li>
             
              <li>Address:{data?.address}</li>
              <li>About:{data?.about}</li>
              {/* <li >Address:dssssssssssss</li> */}
              <li>Gmail:{data?.email}</li>
              <li>Phone:{data?.phonenumber}</li>
              <li>Website:{data?.website_url}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
