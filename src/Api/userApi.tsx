import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";
import { User, UserLogin } from "../Interface/UserInterface";

export const userLogin = async (userData:UserLogin)=> {
    try {
        let response = await axiosInstance.post('/login',userData)
        console.log(response);
        
        return response
    } catch (error :any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
    
}

export const userSignup =async(userData:User)=>{
    try {
        let response = await axiosInstance.post('/signup',userData)
        console.log(response);
        
        return response
        
    } catch (error :any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}

export const verifyOtp =async(otp:string)=>{
    try {
    let Otp ={otp:otp}
   
        let response = await axiosInstance.post('/otp',Otp)
        return response
        
    } catch (error:any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}

    export const resendOtp =async(email:string)=>{
        try {
            let Email ={email:email}
            let response = await axiosInstance.post('/resendotp',Email)
            return response
        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

    export const getUserdata =async(user_id:string)=>{
        try {
            let response =await axiosInstance.get(`/getuserdata?user_id=${user_id}`)
            return response
        } catch (error :any) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message)
            
        }
    }