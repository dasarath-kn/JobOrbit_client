import React, { useState } from 'react'
import loginValidation from '../../Validations/User/Loginvalidation'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useFormik, validateYupSchema } from 'formik'
import { adminLogin } from '../../Api/adminApi'
import { AdminLogin } from '../../Interface/AdminInterface'

const Login = () => {
    let [showpassword, setShowpassword] = useState<boolean>(false)
  let passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  const navigate =useNavigate()
  const {errors,handleBlur,handleChange,handleSubmit,touched} =useFormik({
    initialValues:{
        email:'',
        password:''},
        validateYupSchema:loginValidation,
        onsubmit:async(Data)=>{
            try {
                let response = await adminLogin(Data as AdminLogin)
            } catch (error) {
                console.log(error);
                
            }
        }
    }

  })
 
  return (
<>
<div className='flex flex-col  lg:flex-row justify-center items-center min-h-screen p-4' style={{backgroundColor:'#033431'}}>
   
   <div className='mt-8 lg:mt-0      w-full md:w-1/2 lg:w-1/3 h-auto lg: border shadow-xl flex flex-col p-8'>
   <span className="text-2xl text-white font-extrabold mb-4">JobOrbit</span>
     <span className='text-2xl text-white font-semibold mb-4'> Login</span>
     <div className='flex flex-col'>
   <form onSubmit={handleSubmit}>
       <label className='font-medium mb-2 text-white'>Email:</label>
       <input name="email" onChange={handleChange} onBlur={handleBlur} type="text"  className='bg-white  w-full h-12 p-3 rounded-xl text-white mb-4' placeholder="Enter email" />
       {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

       <label className='font-medium mb-2 text-white'>Password:</label>
       <div className='relative'>
         <input name="password" onChange={handleChange} onBlur={handleBlur}   type={showpassword ? 'text' : 'password'} className='bg-white w-full h-12 p-3 rounded-xl text-black mb-4' placeholder='Enter password' />
         {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}
         <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
           {showpassword ? <FaEyeSlash className='text-white' /> : < FaEye className='text-white' />}
         </div>
       </div>
       <button className='bg-white border-2 font-medium w-full h-12  rounded-lg 'type='submit'>SignIn</button>
     </form>
      
     </div>
   
    </div>
    <Toaster position="top-right" reverseOrder={false} />

 </div>
</>
)
}

export default Login