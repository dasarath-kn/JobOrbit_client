import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { findUser } from '../../Api/userApi';
import { User } from '../../Interface/UserInterface';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import socket from '../../Config/Socket';
interface mes {
  message:string
}
const ViewUserprofile = () => {
  const location = useLocation()
  const { id } = location.state
  const [userdata, setUserdata] = useState<User>()
  useEffect(() => {
    const user = async () => {
      try {
        const response = await findUser(id)
        if (response?.data.success) {
          setUserdata(response.data.userData)
        }
      } catch (error) {
        console.error(error);

      }
    }
    user()
  }, [])
  const mes={
    message:"hello"
  }
  const handleConnect = ()=>{
    socket.emit("notify",mes)
  }
  useEffect(() => {
    if (socket) {
        const handleNotification = (mes:mes) => {
            window.alert(mes.message);
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }
}, [socket]);

  return (
    <>
      <div className='w-full h-auto flex flex-col items-center min-h-screen sm:justify-center'>

        <div className='shadow-2xl rounded-3xl flex flex-col sm:flex-col lg:flex-row p-9 text-white sm:w-full lg:w-4/5 h-auto mb-11 mt-20'>

          <div className='lg:w-1/5 sm:w-1/2 sm:h-1/2 flex justify-center items-center lg:content-center md:content-center'>
            {userdata?.img_url ? (
              <img src={userdata?.img_url} className='ml-4 mt-4 rounded-3xl' alt="Default Image" />
            ) : (
              <img src='../public/user06.png' className='lg:p-9  sm:p-0 lg:mt-9 sm:mt-0' alt="User Image" />
            )}
          </div>

          <div className='flex flex-col lg:flex-row'>
            <div className='border-7 lg:ml-28 mt-8 lg:mt-0'>
              <ul className='space-y-6 text-black font-medium'>
                <li className='text-3xl font-extrabold'>{userdata?.firstname} {userdata?.lastname}</li>
                <li>{userdata?.field}</li>
                <li className='flex items-center text-black'>
                  <FaMapMarkerAlt className='text-gray-500 mr-2' />
                  {userdata?.location}
                </li>
                <li>About: {userdata?.about}</li>
                <li>Gmail: {userdata?.email}</li>
                <li>Phone: {userdata?.phonenumber}</li>
                <li>Portfolio:
                  <a href={`http://www.${userdata?.portfolio_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
                    {userdata?.portfolio_url}
                  </a>
                </li>
                <li>GitHub:
                  <a href={`http://www.${userdata?.github_url}`} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">
                    {userdata?.github_url}
                  </a>
                </li>
                {userdata?.resume_url &&<li>
                <button onClick={() => {
                
                  window.open(userdata?.resume_url, '_blank')
                
              }} className='border-2 border-black w-52 h-9 font-semibold text-white bg-black rounded-full  '>Resume</button>
                </li>}
              </ul>
            </div>
            <div className='flex lg:flex-row  flex-col sm:ml-0 lg:ml-36 lg:space-x-60'>
              <div className='border-7  lg:ml-28 mt-8 lg:mt-0'>
                <ul className='text-black font-medium'>
                  <li className='font-bold'>Education:</li>
                  <li>{userdata?.qualification}</li>
                  <button onClick={handleConnect}>message</button>
                </ul>
              </div>

              <div className='border-7 lg:ml-28 mt-8 lg:mt-0'>
                <ul className='text-black font-medium'>
                  <li className='font-bold'>Skills:</li>
                  {userdata && userdata.skills && userdata.skills.length > 0 ? (
                    userdata.skills.map((val, index) => (
                      <li key={index}>{val}</li>
                    ))
                  ) : (<>

                    <p className='text-gray-500'>Skills not found</p>
                  </>
                  )}
                </ul>
              </div>
           
            </div>
          </div>

        </div>
        {userdata?.experience && userdata.experience.length>0 &&  
        <div className='shadow-2xl rounded-3xl flex sm:flex-col lg:flex-col p-9 text-white sm:w-full lg:w-4/5 w-full h-auto mb-11 mt-20'>

        <div className=' m-6'>
            <div className=''>
              <p className='text-2xl font-semibold text-black'>Experience</p>
            </div>
            <div className=' grid lg:grid-cols-2 sm:grid-rows-1 sm:gap-x-0 lg:gap-x-4 h-auto' >
            {userdata && userdata?.experience.length > 0 && userdata.experience.map((val) => {
                    const startDate = format(new Date(val.start_date), 'MMMM dd, yyyy');
                    const endDate =  val.mode === "Present" ? "Present" : format(new Date(val.end_date), 'MMMM dd, yyyy');
                    return (
                      <div className='rounded-3xl border-9 h-auto bg-gray-100 mt-9 p-5'>
                        <div className='flex justify-end space-x-3'>
                          {/* <MdEdit className='h-12 w-7' />
              <MdDelete className='h-12 w-7'/> */}
                        </div>
                        <div className='flex flex-col space-y-6'>
                          <p className='text-2xl font-semibold text-black text-center md:text-left break-words'>
                            {val.experiencefield}
                          </p>
                          <div className='space-y-4'>
                            <p className='text-xl font-normal text-black'>Start Date: {startDate}</p>
                            <p className='text-xl font-normal text-black'>End Date: {endDate}</p>
                            {/* <p>{val.mode}</p> */}
                          </div>
                          <div>
                            <p className='text-xl font-medium text-black'>Responsibilities:</p>
                            <p className='break-words text-black'>
                              {val.responsibilities}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  }

            </div>

          </div>
        </div>

                }
      </div>

    </>
  )
}

export default ViewUserprofile