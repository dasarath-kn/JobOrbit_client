import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { passwordValidation } from '../../Validations/User/Loginvalidation'
import { resetPassword } from '../../Api/userApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../Interface/UserInterface'
import { companyresetPassword } from '../../Api/companyApi'
import { Company } from '../../Interface/CompanyInterface'
interface props{
    role:string
}
const ResetPassword:React.FC<props> = ({role}) => {
    let [showpassword, setShowpassword] = useState<boolean>(false)
    let passwordvisibility = () => {
        setShowpassword(!showpassword)
      }
      const navigate =useNavigate()
      const location =useLocation()
      const {email} =location.state ||{}

    const {handleBlur,handleChange,handleSubmit,errors,touched} =useFormik({
        initialValues:{
            password:'',
            confirmpassword:''
        },validationSchema:passwordValidation,
        onSubmit:async(Data)=>{
            try {
                if(Data.password == Data.confirmpassword){
                    if(role =="User"){
                        let password =Data.password
                        let userdata ={email,password}
                        let response = await resetPassword(userdata as User) 
                        if(response?.data.success){
                            navigate('/signin')
                        }                       
                    }else{
                        let password =Data.password
                        let companydata ={email,password}
                        let response = await companyresetPassword(companydata as Company) 
                        if(response?.data.success){
                            navigate('/company/signin')
                        }                       
                    }
                }else{
                    toast.error("Password not match")

                }
                
            } catch (error) {
                console.error(error);
                
            }
        }

        
    })
  return (
   <>
    <div className='flex flex-col  lg:flex-row justify-center  items-center min-h-screen p-4'>

<div className='mt-8 lg:mt-0 bg-white w-full md:w-1/2 lg:w-1/3 h-auto lg: border shadow-xl flex flex-col p-8'>
  <span className="text-2xl font-extrabold mb-4">JobOrbit</span>
  <span className='text-2xl font-semibold mb-4'>Reset Password</span>
  <div className='flex flex-col'>
    <form onSubmit={handleSubmit}>
    
      <label className='font-medium mb-2'>Password:</label>
      <div className='relative'>
        <input name="password" onChange={handleChange} onBlur={handleBlur} type={showpassword ? 'text' : 'password'} className='border-2  border-gray-700/70 w-full h-12 p-3 rounded-xl text-black   mb-4' placeholder='Enter password' />
        {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}
        <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
          {showpassword ? <FaEyeSlash className='text-black' /> : < FaEye className='text-black' />}
        </div>
      </div>
      <label className='font-medium mb-2'>Confirm Password:</label>
      <div className='relative'>
        <input name="confirmpassword" onChange={handleChange} onBlur={handleBlur} type={showpassword ? 'text' : 'password'} className='border-2  border-gray-700/70 w-full h-12 p-3 rounded-xl text-black   mb-4' placeholder='Enter password' />
        {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}
        <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
          {showpassword ? <FaEyeSlash className='text-black' /> : < FaEye className='text-black' />}
        </div>
      </div>
      <button className='bg-white border-2 font-medium w-full h-12  rounded-lg hover:bg-black hover:text-white' type='submit'>Submit</button>
    </form>
  </div>

</div>
<Toaster position="top-right" reverseOrder={false} />

</div>
   </>
  )
}

export default ResetPassword
