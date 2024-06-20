import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div id='main1' className='bg-black flex flex-col lg:flex-row justify-evenly p-8 '>
        <div className='text-white flex-1 content-center lg:ml-9 '>
          <h1 className='text-white text-4xl lg:text-6xl mb-4'>Find Your Job With <br /> JobOrbit.</h1>
          <p className='mb-6'>Our platform connects job seekers with a diverse range of job <br /> openings from top companies across various industries.</p>
          <button className='border px-6 py-2 mb-10 rounded-2xl hover:bg-white hover:text-black hover:border'>Learn More</button>
          <ul className='flex flex-col lg:flex-row   space-y-4 lg:space-y-0 lg:space-x-12 text-xs text-gray-400'>
            <li>
              <p>Users</p>
              <p>50 k+ Users</p>
            </li>
            <li>
              <p>Job Vacancy</p>
              <p>10 k+ Jobs</p>
            </li>
            <li>
              <p>Experience</p>
              <p>3+ Years</p>
            </li>
          </ul>
        </div>
        <div className='mt-8 lg:mt-0 flex-1'>
          <img src="public/landingpage1.png" alt="Landing page illustration" className="w-full h-auto  "  />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-evenly items-center py-16'>
        <div className='font-normal max-w-lg text-center lg:text-left'>
          <p className='text-black'>Find a job according to your skills. We will make it easy to make your dreams come true. Come find a job in JobOrbit.</p>
        </div>
        <div className='flex items-center border rounded-xl h-12 w-80 lg:w-96 px-4 mt-4 lg:mt-0'>
          <FaSearch className='text-gray-400 mr-2' />
          <input className='flex-grow border-none focus:outline-none' type="text" placeholder='Location' />
          <button className='bg-black text-white rounded-xl w-20 h-8 ml-2'>Search</button>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:ml-16 justify-evenly py-16'>
        <div className='flex-1'>
          <img src="public/landingpage2.png" alt="Connection illustration" className="w-full h-auto" />
        </div>
        <div className='flex-1 flex flex-col mt-8 lg:mt-0 lg:ml-8 justify-center items-center content-center'>
          <h1 className='my-7 font-bold text-2xl lg:text-4xl text-center'>Build Your Connections.</h1>
          <p className='text-center'>Expanding your professional network by connecting with industrial peers.</p>
          <button className='bg-black my-10 text-white w-44 h-10 rounded-lg '>Connect</button>
        </div>
      </div>

      <div className=''>
        <div className='px-8 lg:px-44'>
          <h1 className='text-black font-medium text-2xl lg:text-3xl'>Popular Category</h1>
        </div>
        <div className='py-10 flex flex-wrap justify-evenly'>
          <div className='w-full lg:w-80 h-24 rounded-md text-center mb-6 lg:mb-0'>
            <h2 className='font-medium'>Web Developer</h2>
            <p>15+ available</p>
          </div>
          <div className='w-full lg:w-80 h-24 rounded-md text-center mb-6 lg:mb-0'>
            <h2 className='font-medium'>Graphic Designer</h2>
            <p>15+ available</p>
          </div>
          <div className='w-full lg:w-80 h-24 rounded-md text-center'>
            <h2 className='font-medium'>Accountant</h2>
            <p>15+ available</p>
          </div>
        </div>
        <div className='flex flex-wrap justify-evenly  '>
          <div className='w-full lg:w-80 h-24 rounded-md text-center mb-6 lg:mb-0 hidden lg:block  '>
            <h2 className='font-medium'>Web Developer</h2>
            <p>15+ available</p>
          </div>
          <div className='w-full lg:w-80 h-24 rounded-md text-center mb-6 lg:mb-0 hidden lg:block '>
            <h2 className='font-medium'>Web Developer</h2>
            <p>15+ available</p>
          </div>
          <div className='w-full lg:w-80 h-24 rounded-md text-center hidden lg:block '>
            <h2 className='font-medium'>Web Developer</h2>
            <p>15+ available</p>
          </div>
        </div>
      </div>

      <div className=''>
        <div className='px-8 lg:px-44'>
          <h1 className='text-black font-medium text-2xl lg:text-3xl'>Find Your Job Here</h1>
        </div>
        <div className='mt-7 flex flex-wrap justify-evenly'>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border mb-6 lg:mb-0'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border mb-6 lg:mb-0'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
        </div>
        <div className='mt-7 flex flex-wrap justify-evenly'>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border mb-6 lg:mb-0 hidden lg:block'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border mb-6 lg:mb-0 hidden lg:block'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
          <div className='p-6 w-full lg:w-80 h-40 rounded-md border hidden lg:block'>
            <h2 className='font-medium text-xl'>Fullstack Developer</h2>
            <p>Codex Technologies</p>
            <FaMapMarkerAlt className='text-gray-400' />
            <p>Bengaluru</p>
            <button className='rounded-xl my-3 bg-black text-white w-20 h-7'>View</button>
          </div>
        </div>
      </div>

      <div className=''>
        <div className='px-8 lg:px-44 mt-5'>
          <h1 className='text-black font-medium text-2xl lg:text-3xl'>Our Client Reviews</h1>
        </div>
        {/* Add your Review Carousel here */}
      </div>
    </>
  )
}

export default LandingPage;
