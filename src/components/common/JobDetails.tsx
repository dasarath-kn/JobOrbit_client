import  { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { jobdata } from '../../Interface/CompanyInterface';
import { useLocation } from 'react-router-dom';
import { jobApply, viewJobdetails } from '../../Api/userApi';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import { User } from '../../Interface/UserInterface';

const JobDetails = () => {
  const [job, setJob] = useState<jobdata >();
  const [skelton,setSkelton]=useState<boolean>(true)
  const location = useLocation();
  const { job_id } = location.state;
 const userDatas: User = useSelector((state: RootState) => state.user);

 
//  interface Applicant {
//   _id: string;
// }
// const applicant: Applicant = { _id:_id };
 const [updated,setUpdated] =useState(false)
 const [limit,setLimit]=useState<Number>(0)

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
  }, [job_id,updated]);

  const handleJobapply = async (job_id: string,company_id:string) => {
    try {
      if(userDatas.plan_id){
        const jobAppliedCount = userDatas.jobapplied_Count ?? 0;
        if(jobAppliedCount <limit){
      let response = await jobApply(job_id,company_id);
      if (response?.data?.success) {
        toast.success(response.data.message);
        setUpdated(!updated)
      } else if (response?.data?.error) {
        toast.error(response.data.error);
      }}else{
        toast.error("Reached your daily limit")
      }}
      else{
        toast.error("Choose a subscription plan for applying")
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while applying for the job.');
    }
  };
  useEffect(()=>{
    let timer =setTimeout(()=>{
        setSkelton(false)
    },2000)
    return()=> clearTimeout(timer)
},[])  
  return (
    <>
     {!skelton?(<div className='w-full min-h-screen lg:m-11 mb-11 flex flex-col items-center  '>
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
            
             {job?.applicants_id?.includes(userDatas._id as string)?(<p className='text-xl font-semibold text-green-500'>Applied</p>):

             (<button
                onClick={() => job?._id && handleJobapply(job._id,job.company_id._id as string)}
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
      </div>):(<div className='w-full min-h-screen lg:m-11 mb-11 flex flex-col items-center'>
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
    </>
  );
};

export default JobDetails;
