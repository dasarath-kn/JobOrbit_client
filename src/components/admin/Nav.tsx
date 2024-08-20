import { FaSearch } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { IoNotificationsSharp } from 'react-icons/io5'

const Nav = () => {
  return (
    <>
      <div className='w-1/2 ml-80 h-28 border-4 flex justify-evenly items-center '>
            <div className=' w-1/2 h-14 r flex flex-row justify-center items-center  '>
            <input type="text" className='text-black w-2/3 h-14  text-xl text-center    border' placeholder='Serach'  />
            <FaSearch className=' text-gray-600   w-11 h-9 ' />
            </div>
            <IoNotificationsSharp className='w-11 h-9  ' />
            <IoIosLogOut className='w-11 h-9 ' />

            
        </div>
    </>
  )
}

export default Nav
