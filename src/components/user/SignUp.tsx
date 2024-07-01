import { useFormik } from 'formik';
import React, {  useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import  { userInitialValues, userValidationSchema } from '../../Validations/User/SignupValidations';
import { User } from '../../Interface/UserInterface';
import { userSignup } from '../../Api/userApi';
import { Toaster, toast } from 'react-hot-toast';

const SignUp:React.FC = () => {
  let [showpassword, setShowpassword] = useState<boolean>(false)
  let [confirmpassword, setConfirmpassword] = useState<boolean>(false)
  const passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  const confirmpasswordvisibility = () => {
    setConfirmpassword(!confirmpassword)
  }
 
  const navigate = useNavigate()
  
    const {errors,values,handleBlur,handleChange,touched,handleSubmit} =useFormik({
      initialValues:userInitialValues,
      validationSchema:userValidationSchema,
      onSubmit:async(Data)=>{
        try {
          if(Data.password == Data.confirmpassword){
           let response = await userSignup(Data as User)
          if(response?.data){
           let {userSaved} =response.data
            navigate('/otp',{state:{email:userSaved.email}})
          }
        }else{
          toast.error("Password not match")
        }
          
        } catch (error) {
          console.log(error);
          
        }
      }
  
  
    })
  
  return (
    <div className='flex flex-col  min-h-screen lg:justify-center items-center   p-11'>
      <div className=' flex flex-col mt-8 lg:mt-0  w-full h-auto lg:w-1/3 border shadow-xl p-8 '>
      <span className="text-2xl font-extrabold mb-4">JobOrbit</span>
        <span className='text-2xl font-semibold '>SignUp</span>

        <form onSubmit={handleSubmit}>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col   w-full md:w-1/2 '>
            <label className='font-medium mb-2 '>Firstname:</label>
            <input name='firstname' value={values.firstname} onChange={handleChange} onBlur={handleBlur} type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Enter firstname" />
            {errors.firstname && touched.firstname && <p className='text-sm text-red-500'>{errors.firstname}</p>}

          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2'>Lastname:</label>
            <input name='lastname' value={values.lastname} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Enter lastname" />
            {errors.lastname && touched.lastname && <p className='text-sm text-red-500'>{errors.lastname}</p>}

          </div>
        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Email:</label>
            <input name='email' value={values.email} type="text"onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Enter email" />
            {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Phonenumber</label>
            <input name="phonenumber" value={values.phonenumber} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Enter phonenumber" />
            {errors.phonenumber && touched.phonenumber && <p className='text-sm text-red-500'>{errors.phonenumber}</p>}

          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Password:</label>
            <div className='relative '>
              <input name='password' value={values.password} type={showpassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur}className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter password' />
              {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

              <div className='absolute right-3 top-3' onClick={passwordvisibility}>
                {showpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Confirm password:</label>
            <div className='relative'>
              <input type={confirmpassword ? 'text' : 'password'} value={values.confirmpassword} name='confirmpassword' onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter confirm password' />
              {errors.confirmpassword && touched.confirmpassword && <p className='text-sm text-red-500'>{errors.confirmpassword}</p>}

              <div className='absolute right-3 top-3' onClick={confirmpasswordvisibility}>
                {confirmpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col  md:w-1/2'>
            <label className='font-medium mb-2 '>Field:</label>
            <input name="field" value={values.field} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Select field of interest" />
            {errors.field && touched.field && <p className='text-sm text-red-500'>{errors.field}</p>}

          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Location:</label>
            <input name="location" value={values.location} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder="Enter your location" />
            {errors.location && touched.location && <p className='text-sm text-red-500'>{errors.location}</p>}

          </div>

        </div>
    
        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <button type='submit' className='border w-full    h-12 text-black  rounded-xl hover:bg-black hover:text-white '>SignUp</button>
          </div>

        </div>
        </form>
        <span className=''>Already Have an account? <a className='text-blue-500 hover:underline' onClick={() => {  navigate('/signin')  }}>SignIn</a></span>
        <div className='flex justify-center'>

          <span className='content mt-4'>Or</span>
        </div>

        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <button className='border w-full bg-black    h-12 text-white  rounded-xl hover:bg-white hover:text-black '>SignUp With Google</button>
          </div>

        </div>

      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  )
}

export default SignUp