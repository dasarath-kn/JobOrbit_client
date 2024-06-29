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