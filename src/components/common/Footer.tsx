import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (

    <>
    <div className='bg-black w-full flex-col md:flex-row md:h-64 flex justify-evenly md:items-center '>
    <div className='mb:8 md:mb:0'>
        <span className='self-center  text-2xl font-semibold whitespace-nowrap dark:text-white'>JobOrbit</span>
        <div >
        <span className='  text-white font-light'>Make your dreams come true with us.</span>
        </div>
    </div>

    <div className='text-white font-light md:pt-20 pt-2 items-start  pl-4 '>
       <ul className=' md:space-y-4 '>

        <li className='hover:text-gray-400'>Home</li>
        <li className='hover:text-gray-400'>About</li>
        <li className='hover:text-gray-400'>How it works</li>
       </ul>
    </div>
    <div className='text-white font-light pt-2  md:pt-20 pl-4'>
    <ul className=' md:space-y-4'>
        <li className='hover:text-gray-400'>Facebook</li>
        <li className='hover:text-gray-400'>Instagram</li>
        <li className='hover:text-gray-400'>Twitter</li>
       </ul>
    </div>
    <div className='text-white font-light md:pt-20 pl-4'>
    <ul className=' md:space-y-4'>
        <li className='hover:text-gray-400'>Privacy Policy</li>
        <li className='hover:text-gray-400'>Terms & Conditions</li>
        <li className='hover:text-gray-400'>FAQ</li>
        <li onClick={()=>navigate('/company/signin')} className='hover:text-gray-400'>Company Register</li>
       </ul>
    </div>
    </div>
    </>
  )
}

export default Footer