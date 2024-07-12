import { useFormik } from 'formik'
import React from 'react'
import  { emailValidation } from '../../Validations/User/Loginvalidation'
import { Toaster } from 'react-hot-toast'
import { verifyUser } from '../../Api/userApi'
import { useNavigate } from 'react-router-dom'
import { verifyCompany } from '../../Api/companyApi'
interface props{
    role:string
}
interface VerifyData {
  email: string;
}
const Emailverify:React.FC<props> = ({role}) => {
    const navigate = useNavigate()
    const {handleChange,handleBlur,handleSubmit,touched,errors} =useFormik({
        initialValues:{
            email:''
        },validationSchema:emailValidation,
        onSubmit:async(Data)=>{
            
            try {              
                if(role =="User"){                  
                    const response = await verifyUser(Data.email )
                    if(response?.data.success){
                        let {Userdata}= response.data
                        navigate('/otp',{state:{email:Userdata.email,mes:"Resetpassword"}})
                    }
                }else{
                  const response = await verifyCompany(Data.email)
                  
                  if(response?.data.success){
                    
                      let {companyData}= response.data
                      navigate('/company/otp',{state:{email:companyData.email,mes:"Resetpassword"}})
                  }

                }
            } catch (error) {
                console.error(error);
                
            }
        }

        
    })
  return (
    <div className='flex flex-col  lg:flex-row justify-center  items-center min-h-screen p-4'>

    <div className='mt-8 lg:mt-0 bg-white w-full md:w-1/2 lg:w-1/3 h-auto lg: border shadow-xl flex flex-col p-8'>
      <span className="text-2xl font-extrabold mb-4">JobOrbit</span>
      <span className='text-2xl font-semibold mb-4'>Reset Password</span>
      <div className='flex flex-col'>
        <form onSubmit={handleSubmit}>
          <label className='font-medium mb-2'>Email:</label>
          <input name="email" type="text" onChange={handleChange} onBlur={handleBlur} className='border-2  border-gray-700/70 w-full h-12 p-3 rounded-xl text-black mb-4' placeholder={"Enter your email"} />
          {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}         
          <button className='bg-white border-2 font-medium w-full h-12  rounded-lg hover:bg-black hover:text-white' type='submit'>Submit</button>
        </form>
      </div>

    </div>
    <Toaster position="top-right" reverseOrder={false} />

  </div>
  )
}

export default Emailverify
