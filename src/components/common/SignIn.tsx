import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userLogin } from '../../Api/userApi';
import loginValidation from '../../Validations/User/Loginvalidation'
import { Toaster, toast } from 'react-hot-toast';
import { User, UserLogin } from '../../Interface/UserInterface';
import { CompanyLogin } from '../../Interface/CompanyInterface';
import { companyLogin } from '../../Api/companyApi';
import { GoogleLogin } from '@react-oauth/google';
import GoogleAuth from './GoogleAuth';


interface props {
  role: string
}
const SignIn: React.FC<props> = ({ role }) => {
  let [showpassword, setShowpassword] = useState<boolean>(false)
  let [field, setField] = useState<string>('')
  let passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  useEffect(() => {
    if (role == 'User') {
      setField('Email')
    } else {
      setField('Company email')

    }
  }, [role])

  const navigate = useNavigate()
  const { errors, handleChange, handleBlur, touched, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,

    onSubmit: async (Data) => {
      try {
        if (role == "User") {
          let response = await userLogin(Data as UserLogin)


          if (response?.data) {
            let { userExistdata } = response.data
            if (!userExistdata.is_verified) {
              navigate('/otp', { state: { email: userExistdata.email } })
            }
            else {
              localStorage.setItem("Usertoken", response.data.token)
              navigate('/post',)
            }
          }
        }
        else {
          let response = await companyLogin(Data as CompanyLogin)
          if (response?.data) {
            let { companyData } = response.data
            if (!companyData.is_verified) {
              navigate('/company/otp', { state: { email: companyData.email } })

            } else {
              localStorage.setItem("Companytoken", response.data.token)
              navigate('/company/profile')
            }
          }
        }

      } catch (error) {
        console.error(error);

      }
    }
  })

  return (
    <div className='flex flex-col  lg:flex-row justify-center  items-center min-h-screen  p-4'>

      <div className='mt-8 lg:mt-0 bg-white w-full md:w-1/2 lg:w-1/3 h-auto lg: border shadow-xl flex flex-col p-8'>
        {/* <span className="text-2xl font-extrabold mb-4">JobOrbit</span> */}

        <img src="/Joborbit.png" className='w-40 ' alt="" />
        <span className='text-2xl font-semibold mb-4 mt-4'>{`${role} Login`}</span>
        <div className='flex flex-col'>
          <form onSubmit={handleSubmit}>
            <label className='font-medium mb-2'>{field}:</label>
            <input name="email" type="text" onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 p-3 rounded-xl text-black mb-4' placeholder={`Enter ${field.toLowerCase()}`} />
            {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

            <label className='font-medium mb-2'>Password:</label>
            <div className='relative'>
              <input name="password" onChange={handleChange} onBlur={handleBlur} type={showpassword ? 'text' : 'password'} className='border-2  border-gray-700/70 w-full h-12 p-3 rounded-xl text-black   mb-4' placeholder='Enter password' />
              {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}
              <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
                {showpassword ? <FaEyeSlash className='text-black' /> : < FaEye className='text-black' />}
              </div>
            </div>
            <span onClick={() => role == "User" ? navigate('/verify') : navigate('/company/verify')} className='font-normal self-end mb-4 text-right'>Forget Password?</span>
            <button className='bg-white border-2 font-medium w-full h-12  rounded-lg hover:bg-black hover:text-white' type='submit'>SignIn</button>
          </form>
          <span className=''>Don't Have an account? <a className='text-blue-500 hover:underline' onClick={() => { role == 'User' ? navigate('/signup') : navigate('/company/signup') }}>SignUp</a></span>
          <span className='text-center font-semibold'>Or</span>
          <GoogleAuth role={role} />
        </div>

      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  )
}

export default SignIn
