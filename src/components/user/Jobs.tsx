import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { jobdata } from '../../Interface/CompanyInterface'
import { getJobs } from '../../Api/userApi'

const Jobs = () => {
    let [jobdata,setJobdata]=useState<jobdata[]>([])
    useEffect(()=>{
        let jobs =async ()=>{
            try {
                let response = await getJobs()
            if(response?.data){
                setJobdata(response.data.jobs)
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    jobs()
},[])

  return (
    <>
   <div className="w-screen h-screen flex justify-center mt-6 ">
    <div className="grid grid-cols-4 gap-x-10">
        {jobdata && jobdata.map((val)=>{            
            return(<>
        
        <div className="p-6 sm:w-40 lg:w-80 h-40 rounded-md border shadow-xl">
            <h2 className="font-medium text-xl">{val.jobtitle}</h2>
            <p>{val.company_id.companyname}</p>
            <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt />
                <p className="ml-2 text-black">{val.company_id.state}</p>
            </div>
            <button className="rounded-xl my-3 bg-black text-white w-20 h-7">View</button>
        </div>
        </>)})}
       
      
        
        {/* Repeat the above div for each job listing */}
    </div>
</div>

    </>
  )
}

export default Jobs
