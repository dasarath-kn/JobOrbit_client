import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserdata } from '../../Api/userApi';
import { User } from '../../Interface/UserInterface';


const Dashboard = () => {
  let [data, setData] = useState<User>()
  let token = localStorage.getItem("Usertoken")
  const navigate = useNavigate()
  console.log(localStorage.getItem("Usertoken"));

  useEffect(() => {
    const userData = async () => {
      try {
        let response = await getUserdata()
        if (response?.data.success) {

          setData(response?.data.userData)
        } else {
          navigate('/')
        }

      } catch (error) {
        console.error(error);

      }
    }
    userData()
  }, [token])
  const handleLogout = () => {
    localStorage.removeItem("Usertoken")
    navigate('/')
  }
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col items-center  mt-40 w-80 ml-14 h-fit rounded-2xl shadow-2xl border-8'>
        <ul className='mt-5'>
          <li>
            {data?.img_url ?
              <img src="" className='w-20 rounded-xl hover:' alt="" />
              : <img src="/user06.png" className='w-20 rounded-xl hover:' alt="" />
            }
          </li>
          <li className='font-semibold text-2xl' >{data?.firstname}</li>
          <li className='text-gray-500'>
            <button >View Profile</button>
          </li>
          <li className='text-gray-500 text-center'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <div className='mt-4 text-xl font-medium'>
          <ul className='space-y-5 '>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center' >Posts</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Jobs</li>
            <li className='hover:bg-black rounded-xl w-24  hover:text-white hover:text-center'>Network</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Inbox</li>
            <li className='hover:bg-black rounded-xl w-20  hover:text-white hover:text-center'>Saved</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
