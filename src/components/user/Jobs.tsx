import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { jobdata } from '../../Interface/CompanyInterface'
import { getJobs, getUserdata } from '../../Api/userApi'
import { useNavigate } from 'react-router-dom'
import { setUserdetails } from '../../Redux/UserSlice'
import { useDispatch } from 'react-redux'

const Jobs = () => {
    const dispatch = useDispatch ()
    let [jobdata,setJobdata]=useState<jobdata[]>([])
    let [search,setSearch]=useState<string>('')
    let [data,setData]=useState<jobdata[]>()
    const navigate =useNavigate()
    useEffect(()=>{
        let jobs =async ()=>{
            try {
                let response = await getJobs()
            if(response?.data){
                setJobdata(response.data.jobs)
                setData(response.data.jobs)
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    jobs()
},[])
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
  const handleSearch =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value      
    setSearch(value)
          if(value==''){
            setJobdata(data)
          }  

        
  }    
  const handleSubmit = ()=>{
    
    const filterData = jobdata.filter((val)=>{
       return val.jobtitle.toLowerCase().includes(search.toLocaleLowerCase())
    })
    setJobdata(filterData)
  }
  return (
    <>
   <div className="w-screen h-screen  mt-6 ">
   <div className='flex justify-center items-center space-y-9 flex-col text-center'>

   <p className='  font-medium text-3xl'>Search And Apply The Job You Want</p>
   <div className='flex items-center  border rounded-xl h-12 w-80 lg:w-96 px-4 mt-4 lg:mt-0'>
          <FaSearch className='text-gray-400 mr-2' />
          <input value={search}      className='flex-grow border-none focus:outline-none' onChange={(e)=>handleSearch(e)} type="text" placeholder='Location' />
          <button onClick={handleSubmit} className='bg-black text-white rounded-xl w-20 h-8 ml-2'>Search</button>
        </div>
   </div>
   <div className='flex justify-center'>

 
    <div className=" grid mt-12 grid-cols-4 gap-x-10 gap-y-10">
        {jobdata.length>0 ? (jobdata.map((val)=>{            
            return(<>
        
        <div className="p-6 sm:w-40 lg:w-80 h-40 rounded-md border shadow-xl">
            <h2 className="font-medium text-xl">{val.jobtitle}</h2>
            <p>{val.company_id.companyname}</p>
            <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt />
                <p className="ml-2 text-black">{val.company_id.state}</p>
            </div>
            <button onClick={()=>navigate('/jobdetails',{state:{job_id:val._id}})} className="rounded-xl my-3 bg-black text-white w-20 h-7">View</button>
        </div>
        </>)})):(<>
            <div className='flex justify-center  items-center w-full h-full'>
            <p className='text-2xl text-center font-medium '>No jobs found</p>
          </div>
        </>)}
       
    </div>
    </div>
</div>

    </>
  )
}

export default Jobs
