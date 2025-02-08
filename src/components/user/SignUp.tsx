import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import GoogleAuth from '../common/GoogleAuth';
import toast, { Toaster } from 'react-hot-toast';
import { userSignup } from '../../Api/userApi';
import { User } from '../../Interface/UserInterface';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userInitialValues, userValidationSchema } from '../../Validations/User/SignupValidations';

function Up() {
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
        initialValues: userInitialValues,
        validationSchema: userValidationSchema,
        onSubmit: async (Data) => {
            try {
                if (Data.password == Data.confirmpassword) {
                    let response = await userSignup(Data as User)
                    if (response?.data) {
                        let { userSaved } = response.data
                        navigate('/otp', { state: { email: userSaved.email } })
                    } else {
                        console.log(response);

                        toast.error(response?.data.message)
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
        <div className="flex min-h-screen">
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 to-purple-500/50 mix-blend-multiply" />
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-white space-y-6 max-w-xl">
                            <h2 className="text-4xl font-bold">Join Our Professional Network</h2>
                            <p className="text-lg opacity-90">Connect with opportunities and grow your career with JobOrbit's extensive network of employers and professionals.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 overflow-y-auto">
                <div className="flex flex-col min-h-screen p-8 lg:p-12 justify-center">
                    <div className="max-w-md w-full mx-auto space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">

                                <h1 className="text-4xl font-bold text-gray-900">JobOrbit</h1>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
                                <p className="text-gray-600">Start your professional journey with us</p>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        name="firstname"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John"
                                        onBlur={handleBlur}
                                    />
                                    {errors.firstname && touched.firstname && <p className='text-sm text-red-500'>{errors.firstname}</p>}

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Doe"
                                        onBlur={handleBlur}

                                    />
                                    {errors.lastname && touched.lastname && <p className='text-sm text-red-500'>{errors.lastname}</p>}

                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                        onBlur={handleBlur}

                                    />
                                    {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phonenumber"
                                        value={values.phonenumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1 (555) 000-0000"
                                        onBlur={handleBlur}

                                    />
                                    {errors.phonenumber && touched.phonenumber && <p className='text-sm text-red-500'>{errors.phonenumber}</p>}

                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showpassword ? 'text' : 'password'}
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                            placeholder="••••••••"
                                            onBlur={handleBlur}

                                        />
                                        {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

                                        <button
                                            type="button"
                                            onClick={passwordvisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={confirmpassword ? 'text' : 'password'}
                                            value={values.confirmpassword}
                                            onChange={handleChange}
                                            name="confirmpassword"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                            placeholder="••••••••"
                                            onBlur={handleBlur}

                                        />
                                        {errors.confirmpassword && touched.confirmpassword && <p className='text-sm text-red-500'>{errors.confirmpassword}</p>}

                                        <button
                                            type="button"
                                            onClick={confirmpasswordvisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {confirmpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Interest</label>
                                    <input
                                        type="text"
                                        name="field"
                                        value={values.field}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g. Software Development"
                                        onBlur={handleBlur}

                                    />
                                    {errors.field && touched.field && <p className='text-sm text-red-500'>{errors.field}</p>}

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g. New York, NY"
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                    {errors.location && touched.location && <p className='text-sm text-red-500'>{errors.location}</p>}

                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="space-y-4">
                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <a onClick={() => navigate('/signin')} className="text-black hover:underline font-medium">
                                    Sign in
                                </a>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <GoogleAuth role={"User"} />


                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />

        </div>
    );
}

export default Up;