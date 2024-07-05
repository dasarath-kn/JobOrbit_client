import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { jwtDecode } from "jwt-decode";
import { googleSignup } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import Googleauth from '../../Interface/GoogleauthToken';
import { companyGooglesignup } from '../../Api/companyApi';
interface props {
    role: string
}
const GoogleAuth: React.FC<props> = ({ role }) => {
    const navigate = useNavigate()
    const googlesignup = async (response: CredentialResponse) => {
        try {
            const result = jwtDecode<Googleauth>(response.credential as string)
            const data = {
                name: result.name,
                email: result.email,
                isGoogle: true
            }
            if (role == "User") {
                let Response = await googleSignup(data)
                if (Response?.data.success) {
                    let { token } = Response.data;


                    localStorage.setItem("Usertoken", token)
                    navigate("/dashboard")
                }
            } else {
                    let Response = await companyGooglesignup(data)
                    if(Response?.data.success){
                        let {token} =Response.data
                        localStorage.setItem("Companytoken",token)
                        navigate('/company/profile')
                    }
            }




        } catch (error) {
            console.error(error);

        }
    }
    return (
        <div className='flex justify-center'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    googlesignup(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    )
}

export default GoogleAuth
