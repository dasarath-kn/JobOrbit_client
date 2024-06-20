import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
interface props {
  role: string
}
const SignUp: React.FC<props> = ({ role }) => {
  let [status, setStatus] = useState<boolean>(false)
  let [showpassword, setShowpassword] = useState<boolean>(false)
  let [confirmpassword, setConfirmpassword] = useState<boolean>(false)
  const passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  const confirmpasswordvisibility = () => {
    setConfirmpassword(!confirmpassword)
  }
  useEffect(() => {
    if (role == 'Company') {

      setStatus(!status)
    }
  }, [role])
  const navigate = useNavigate()
  return (
    <div className='flex flex-col  min-h-screen lg:justify-center items-center   p-11'>
      <div className=' mt-8 lg:mt-0  w-full h-auto lg:w-1/3 border  '>
        <span className='text-2xl font-semibold mb-8'>SignUp</span>

        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col   w-full md:w-1/2 '>
            <label className='font-medium mb-2 '>{role=='User'?"Firstname:":"Companyname:"}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?"firstname":"companyname"}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2'>{role=='User'?'Lastname:':'Email:'}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'lastname':'email'}`} />
          </div>
        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=='User'?'Email:':'Phonenumber:'}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'email':'phonenumber'}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=="User"?"Phonenumber:":"Industry:"}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'phonenumber':'industry'}`} />
          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Password:</label>
            <div className='relative '>
              <input type={showpassword ? 'text' : 'password'} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter password' />
              <div className='absolute right-3 top-3' onClick={passwordvisibility}>
                {showpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Confirm password:</label>
            <div className='relative'>
              <input type={confirmpassword ? 'text' : 'password'} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter confirm password' />
              <div className='absolute right-3 top-3' onClick={confirmpasswordvisibility}>
                {confirmpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col  md:w-1/2'>
            <label className='font-medium mb-2 '>{role=='User'?"Field:":"State"}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`${role=="User"?'Select field of interest':'Enter your state'}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=="User"?"Location:":"City"}</label>
            <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter your ${role =="User"?"location":"city"}`} />
          </div>

        </div>
        {status &&
          <>

            <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
              <div className='flex flex-col  md:w-full'>
                <label className='font-medium mb-2 '>Address:</label>
                <input type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter address' />
              </div>
            </div>
            <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
              <div className='flex flex-col  md:w-full'>
                <label className='font-medium mb-2 '>About:</label>
                <input type="text" className='bg-black w-full h-24 rounded-xl p-3 text-white' placeholder='Enter about' />
              </div>
            </div>
          </>


        }
        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <button className='border w-full    h-12 text-black  rounded-xl hover:bg-black hover:text-white '>SignUp</button>
          </div>

        </div>
        <span className=''>Already Have an account? <a className='text-blue-500 hover:underline' onClick={() => { role == 'User' ? navigate('/signin') : navigate('/company/signin') }}>SignIn</a></span>
        <div className='flex justify-center'>

          <span className='content mt-4'>Or</span>
        </div>

        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <button className='border w-full bg-black    h-12 text-white  rounded-xl hover:bg-white hover:text-black '>SignUp With Google</button>
          </div>

        </div>


      </div>

    </div>
  )
}

export default SignUp