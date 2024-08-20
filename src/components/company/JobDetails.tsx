import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {  jobdata } from '../../Interface/CompanyInterface';
import { useLocation } from 'react-router-dom';
import {  viewJobdetails } from '../../Api/userApi';
import  { Toaster } from 'react-hot-toast';

const JobDetails = () => {
  const [job, setJob] = useState<jobdata | null>(null);
  const location = useLocation();
  const { job_id } = location.state;
//  const companyDatas: Company = useSelector((state: RootState) => state.company);


  useEffect(() => {
    const Jobdetails = async () => {
      try {
        let response = await viewJobdetails(job_id as string);
        if (response?.data) {
          setJob(response.data.jobDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };
    Jobdetails();
  }, [job_id]);

 
  return (
    <>
      <div className='w-screen h-auto lg:m-12 flex flex-col items-center'>
        <div className='w-full flex flex-col md:flex-row'>
          <div className='flex justify-center md:ml-40 mb-5 md:mb-0'>
            {job?.company_id.img_url ? (
              <img src={job.company_id.img_url} className='w-96 h-auto' alt='' />
            ) : (
              <img src='/imgadd.jpg' className='w-96 h-auto' alt='' />
            )}
          </div>
          <div className='space-y-3 text-center ml-7 md:text-left'>
            <p className='text-3xl font-bold'>{job?.jobtitle}</p>
            <p className='text-xl font-semibold'>{job?.company_id.companyname}</p>
            <div className='flex items-center  justify-center md:justify-start text-gray-400'>
              <FaMapMarkerAlt />
              <p className='ml-2 text-black'>{job?.company_id.city}</p>
            </div>
          
          </div>
        </div>
        <div className='w-full lg:ml-96 sm:ml-4 md:ml-16 mt-10 space-y-6'>
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
      </div>
    </>
  );
};

export default JobDetails;
