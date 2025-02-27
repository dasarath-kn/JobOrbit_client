import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../Interface/CompanyInterface';
import { companyInitialValues, companyValidationSchema } from '../../Validations/Company/Signupvalidations';
import { companySignup } from '../../Api/companyApi';
import { Toaster, toast } from 'react-hot-toast';
import GoogleAuth from '../common/GoogleAuth';

const SignUp: React.FC = () => {
  let [showpassword, setShowpassword] = useState<boolean>(false)
  let [confirmpassword, setConfirmpassword] = useState<boolean>(false)
  const passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  const confirmpasswordvisibility = () => {
    setConfirmpassword(!confirmpassword)
  }
  const navigate = useNavigate()


  const { errors, values, handleBlur, handleChange, touched, handleSubmit } = useFormik({
    initialValues: companyInitialValues,
    validationSchema: companyValidationSchema,
    onSubmit: async (Data) => {
      try {

        if (Data.password == Data.confirmpassword) {
          let response = await companySignup(Data as Company)
          if (response?.data) {
            let { companySaved } = response?.data
            navigate('/company/otp', { state: { email: companySaved.email } })
          }

        } else {
          toast.error("Password not match")
        }


      } catch (error) {
        console.error(error);

      }
    }


  })

  return (
    <div className='flex flex-col  min-h-screen lg:justify-center items-center   p-11'>
      <div className=' mt-8 lg:mt-0  w-full h-auto lg:w-1/3 border shadow-xl p-8 '>
        <img src="/Joborbit.png" className='w-40 mb-4 ' alt="" />

        <span className='text-2xl font-semibold mb-8'>SignUp</span>

        <form onSubmit={handleSubmit}>
          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col   w-full md:w-1/2 '>
              <label className='font-medium mb-2 '>Companyname:</label>
              <input name='companyname' value={values.companyname} onChange={handleChange} onBlur={handleBlur} type="text" className='border-2  border-gray-700/70  w-full h-12 rounded-xl p-3 text-black' placeholder="Enter companyname" />
              {errors.companyname && touched.companyname && <p className='text-sm text-red-500'>{errors.companyname}</p>}

            </div>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2'>Email:</label>
              <input name='email' type="text" value={values.email} onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder="Enter email" />
              {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

            </div>
          </div>
          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2 '>Phonenumber:</label>
              <input name='phonenumber' value={values.phonenumber} type="text" onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder="Enter phonenumber" />
              {errors.phonenumber && touched.phonenumber && <p className='text-sm text-red-500'>{errors.phonenumber}</p>}

            </div>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2'>Industry:</label>
              <div className="relative">
                <select
                  name="industry"
                  value={values.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='border-2 border-gray-700/70 w-full h-12 rounded-xl p-3 text-black'
                >
                  <option value="">Select an industry</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  {/* Add more options as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.industry && touched.industry && <p className='text-sm text-red-500'>{errors.industry}</p>}
            </div>


          </div>
          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2 '>Password:</label>
              <div className='relative '>
                <input name='password' value={values.password} type={showpassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder='Enter password' />
                {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

                <div className='absolute right-3 top-3' onClick={passwordvisibility}>
                  {showpassword ? <FaEyeSlash className='text-black' /> : <FaEye className='text-black' />}
                </div>
              </div>
            </div>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2 '>Confirm password:</label>
              <div className='relative'>
                <input type={confirmpassword ? 'text' : 'password'} name='confirmpassword' onChange={handleChange} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder='Enter confirm password' />
                {errors.confirmpassword && touched.confirmpassword && <p className='text-sm text-red-500'>{errors.confirmpassword}</p>}

                <div className='absolute right-3 top-3' onClick={confirmpasswordvisibility}>
                  {confirmpassword ? <FaEyeSlash className='text-black' /> : <FaEye className='text-black' />}
                </div>
              </div>
            </div>

          </div>
          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col  md:w-1/2'>
              <label className='font-medium mb-2 '>State:</label>
              <input name="state" type="text" value={values.state} onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder="Enter your state" />
              {errors.state && touched.state && <p className='text-sm text-red-500'>{errors.state}</p>}

            </div>
            <div className='flex flex-col md:w-1/2'>
              <label className='font-medium mb-2 '>City:</label>
              <input name="city" type="text" onChange={handleChange} value={values.city} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder="Enter your city" />
              {errors.city && touched.city && <p className='text-sm text-red-500'>{errors.city}</p>}

            </div>

          </div>


          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col  md:w-full'>
              <label className='font-medium mb-2 '>Address:</label>
              <input name='address' type="text" value={values.address} onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 rounded-xl p-3 text-black' placeholder='Enter address' />
              {errors.address && touched.address && <p className='text-sm text-red-500'>{errors.address}</p>}

            </div>
          </div>
          <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
            <div className='flex flex-col  md:w-full'>
              <label className='font-medium mb-2 '>About:</label>
              <input name='about' type="text" value={values.about} onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-24 rounded-xl p-3 text-black' placeholder='Enter about' />
              {errors.about && touched.about && <p className='text-sm text-red-500'>{errors.about}</p>}

            </div>
          </div>

          <div className='flex justify-center'>
            <div className='w-1/2 mt-6 '>
              <button type='submit' className='border w-full    h-12 text-black  rounded-xl hover:bg-black hover:text-white '>SignUp</button>
            </div>

          </div>
        </form>
        <span className=''>Already Have an account? <a className='text-blue-500 hover:underline cursor-pointer' onClick={() => { navigate('/company/signin') }}>SignIn</a></span>
        <div className='flex justify-center'>

          <span className='content mt-4'>Or</span>
        </div>

        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <GoogleAuth role={"Company"} />
          </div>

        </div>

      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  )
}

export default SignUp