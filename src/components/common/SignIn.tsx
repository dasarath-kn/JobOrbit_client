import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companyLogin } from '../../Api/companyApi';
import { CompanyLogin } from '../../Interface/CompanyInterface';
import { UserLogin } from '../../Interface/UserInterface';
import { userLogin } from '../../Api/userApi';
import loginValidation from '../../Validations/User/Loginvalidation';
import { useFormik } from 'formik';
import GoogleAuth from './GoogleAuth';
import { Toaster } from 'react-hot-toast';

interface props {
    role: string
}

const SignIn: React.FC<props> = ({ role }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [field, setField] = useState('Email');
    const navigate = useNavigate()


    useEffect(() => {
        setField(role === 'User' ? 'Email' : 'Company email');
    }, [role]);
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
        <div className="min-h-screen bg-[#f8f9fa] flex">
            <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                <img 
            src={role === 'User' 
              ? "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
              : "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
            }
            alt="Office"
            className="object-cover w-full h-full opacity-50 transition-opacity duration-500"
          />
                </div>
                <div className="relative z-10 text-white text-center px-8">
                <h2 className="text-4xl font-bold mb-6">
            {role === 'User' ? 'Find Your Dream Job' : 'Find Your Perfect Candidate'}
          </h2>
          <p className="text-lg text-gray-200">
            {role === 'User' 
              ? 'Connect with top employers and opportunities that match your expertise'
              : 'Connect with talented professionals and build your dream team'
            }
          </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-black p-3 rounded-xl">
                                <Briefcase className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-600">{role === 'User' ? 'Sign in to access your job search' : 'Sign in to manage your company profile'}</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                {field}
                            </label>
                            <input
                                type="email" name='email'
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors"
                                onChange={handleChange} onBlur={handleBlur} placeholder={`Enter your ${field.toLowerCase()}`}
                            />
                            {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? 'text' : 'password'} name='password'
                                 onChange={handleChange} onBlur={handleBlur}  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors"
                                    placeholder="Enter your password"
                                />
                                {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <button onClick={() => role == "User" ? navigate('/verify') : navigate('/company/verify')} type="button" className="text-sm font-medium text-gray-700 hover:text-black">
                                Forgot password?
                            </button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#f8f9fa] text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <GoogleAuth role={role} />

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button onClick={() => { role == 'User' ? navigate('/signup') : navigate('/company/signup') }} className="font-medium text-black hover:underline">
                                Create an account
                            </button>
                        </p>
                    </form>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />

        </div>
    );
}

export default SignIn;