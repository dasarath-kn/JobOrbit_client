import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import otpValidation from '../../Validations/User/Otp'
import { verifyOtp, } from '../../Api/companyApi'
import { resendOtp, userverifyOtp } from '../../Api/userApi'
import toast, { Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
interface Props{
  role:string
}
const Otp:React.FC<Props> = ({role}) => {
  const navigate=useNavigate()
  let [count,setCount]=useState<number>(59)
  let [resend,setResend] =useState<boolean>(false)
  const location =useLocation()
  const {email} =location.state ||{}
  const {mes}=location.state||{}
  
  useEffect(()=>{
    let timer:NodeJS.Timeout | number
    if(count>0){
     timer =setTimeout(()=>{
      setCount(count-1)
    },1000)
  }else{
    setResend(!resend)
  }
     return ()=>{clearInterval(timer)}

  },[count])
  let {values,handleSubmit,handleChange,handleBlur,errors,touched} =useFormik({
    initialValues:{
      otp:''
    },
    validationSchema:otpValidation,
    onSubmit:async(Data)=>{
      try {
        
        if(role=="Company"){
        let response = await verifyOtp(Data.otp)
        if(response?.data){
          if(mes=="Resetpassword"){
            navigate('/company/resetpassword',{state:{email:email}})
          }else{
          localStorage.setItem("Companytoken",response.data.token)
          navigate('/company/profile')
          }
        }
      }else{
        let response = await userverifyOtp(Data.otp)
        
        if(response?.data){
          
          if(mes =="Resetpassword"){
            navigate('/resetpassword',{state:{email:email}})
          }else{
            
            localStorage.setItem("Usertoken",response.data.token)
            localStorage.setItem("UserRefreshtoken",response.data.refreshtoken)
            navigate('/post')
          }
        }
      }        
      } catch (error) {
        console.error(error);
        
      }
    }
  })
  const otpResend =async()=>{  
    
    let response =await resendOtp(email)
    toast.success(response?.data.message)
    setCount(59)
    setResend(!resend)
    
  }
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen">
    <div className="flex flex-col mt-12  border shadow-xl lg:h-auto lg:w-1/3 p-6 ">
      <span className="text-2xl font-extrabold mb-8">JobOrbit</span>
      <span className="text-2xl font-semibold mb-8">Otp Verification</span>
      <span className='text-center text-xl font-medium'>00:{count}</span>
     <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center w-full">
        <input name='otp' type="number" value={values.otp} onChange={handleChange} onBlur={handleBlur} className="mt-4 w-full lg:w-2/3 h-20 text-2xl text-center bg-black text-white no-spinner" placeholder="Enter your otp"  />
        {errors.otp && touched.otp && <p className='text-sm text-red-500'>{errors.otp}</p>}

        <button type='submit' className="bg-black mt-5 w-full lg:w-1/3 h-14 text-white rounded-xl hover:bg-white hover:text-black hover:border-2 font-medium" disabled={resend} >Submit</button>
        {
          resend && <button onClick={otpResend} type='button'
           className="hover:bg-black hover:text-white mt-5 w-full lg:w-1/3 h-14  rounded-xl bg-white text-black border-2 font-medium">Resend</button>
          
        }
      </div>
        </form>
    </div>
    <Toaster position="top-right" reverseOrder={false} />

  </div>
  
  )
}

export default Otp