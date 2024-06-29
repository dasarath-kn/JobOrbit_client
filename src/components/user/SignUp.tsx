import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import  { userInitialValues, userValidationSchema } from '../../Validations/User/SignupValidations';
import { User } from '../../Interface/UserInterface';
import { userSignup } from '../../Api/userApi';
import { Company } from '../../Interface/CompanyInterface';
import { companyInitialValues, companyValidationSchema } from '../../Validations/Company/Signupvalidations';
import { companySignup } from '../../Api/companyApi';
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
  const initialValues = role === 'User' ? userInitialValues : companyInitialValues;
  const validationSchema = role === 'User' ? userValidationSchema : companyValidationSchema;
  
    const {errors,handleBlur,handleChange,touched,handleSubmit} =useFormik({
      initialValues,
      validationSchema,
      onSubmit:async(Data)=>{
        try {
          let response;
          if(role =="User"){
             console.log("ddddddddd");
            
            response = await userSignup(Data as User)

          }else{
            response =await companySignup(Data as Company)
          }
          if(response?.data){
            navigate('/')
          }
          
        } catch (error) {
          console.log(error);
          
        }
      }
  
  
    })
  
  return (
    <div className='flex flex-col  min-h-screen lg:justify-center items-center   p-11'>
      <div className=' mt-8 lg:mt-0  w-full h-auto lg:w-1/3 border  '>
        <span className='text-2xl font-semibold mb-8'>SignUp</span>

        <form onSubmit={handleSubmit}>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col   w-full md:w-1/2 '>
            <label className='font-medium mb-2 '>{role=='User'?"Firstname:":"Companyname:"}</label>
            <input name='firstname' onChange={handleChange} onBlur={handleBlur} type="text" className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?"firstname":"companyname"}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2'>{role=='User'?'Lastname:':'Email:'}</label>
            <input name={role=='User'?"lastname":"email"} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'lastname':'email'}`} />
          </div>
        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=='User'?'Email:':'Phonenumber:'}</label>
            <input name={role=='User'?'email:':'phonenumber:'} type="text"onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'email':'phonenumber'}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=="User"?"Phonenumber:":"Industry:"}</label>
            <input name={role=="User"?"phonenumber:":"industry:"} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter ${role=='User'?'phonenumber':'industry'}`} />
          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Password:</label>
            <div className='relative '>
              <input name='password' type={showpassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur}className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter password' />
              {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

              <div className='absolute right-3 top-3' onClick={passwordvisibility}>
                {showpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>Confirm password:</label>
            <div className='relative'>
              <input type={confirmpassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter confirm password' />
              <div className='absolute right-3 top-3' onClick={confirmpasswordvisibility}>
                {confirmpassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
              </div>
            </div>
          </div>

        </div>
        <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
          <div className='flex flex-col  md:w-1/2'>
            <label className='font-medium mb-2 '>{role=='User'?"Field:":"State"}</label>
            <input name={role=='User'?"field:":"state"} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`${role=="User"?'Select field of interest':'Enter your state'}`} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label className='font-medium mb-2 '>{role=="User"?"Location:":"City"}</label>
            <input name={role=="User"?"location:":"city"} type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder={`Enter your ${role =="User"?"location":"city"}`} />
          </div>

        </div>
        {status &&
          <>

            <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
              <div className='flex flex-col  md:w-full'>
                <label className='font-medium mb-2 '>Address:</label>
                <input name='address' type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-12 rounded-xl p-3 text-white' placeholder='Enter address' />
              </div>
            </div>
            <div className='flex  flex-col md:flex-row space-x-0 md:space-y-0 md:space-x-4 space-y-4 mt-6 '>
              <div className='flex flex-col  md:w-full'>
                <label className='font-medium mb-2 '>About:</label>
                <input name='about' type="text" onChange={handleChange} onBlur={handleBlur} className='bg-black w-full h-24 rounded-xl p-3 text-white' placeholder='Enter about' />
              </div>
            </div>
          </>


        }
        <div className='flex justify-center'>
          <div className='w-1/2 mt-6 '>
            <button type='submit' className='border w-full    h-12 text-black  rounded-xl hover:bg-black hover:text-white '>SignUp</button>
          </div>

        </div>
        </form>
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