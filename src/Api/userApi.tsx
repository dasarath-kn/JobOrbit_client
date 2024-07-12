import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";
import { User, UserLogin } from "../Interface/UserInterface";
import GoogleauthToken from "../Interface/GoogleauthToken";
import GoogleAuth from "../Interface/GoogleauthToken";

export const userLogin = async (userData:UserLogin)=> {
    try {
        let response = await axiosInstance.post('/login',userData)        
        return response
    } catch (error :any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
    
}

export const userSignup =async(userData:User)=>{
    try {
        let response = await axiosInstance.post('/signup',userData)        
        return response
        
    } catch (error :any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}

export const userverifyOtp =async(otp:string)=>{
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

    export const getUserdata =async()=>{
        try {
            const token = localStorage.getItem("Usertoken")
            
            let response =await axiosInstance.get("/getuserdata",{headers:{
                "Authorization":token
            }})
            
            return response
        } catch (error :any) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message)
            
        }
    }
    export const verifyUser =async(email:string)=>{
        try {
            const Email={
                email:email
            }
            let response =await axiosInstance.post('/verfiyuser',Email)
            return response
        } catch (error:any) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message)
        }
    }

    export const googleSignup =async(userdata:GoogleAuth)=>{
        try {
            let response = await axiosInstance.post("/googlesignup",userdata)
            return response
            
        } catch (error:any) {
            console.error(error.response.data.message);
            
        }
    }
    export const resetPassword =async(userdata:User)=>{
        try {
            let response = await axiosInstance.patch('/resetpassword',userdata)
            return response
            
        } catch (error:any) {
            console.error(error.response.data.message);
  
        }

    }

    export const editProfile = async (userdata:User,token:string) => {
        try {
          let response = await axiosInstance.post('/editprofile', userdata, {
            headers: {
              'Content-Type': 'multipart/form-data', 
              "Authorization":token
            },
          });
          return response;
        } catch (error:any) {
          console.error(error);
          
        }
      };

      export const getJobs =async()=>{
        try {
            let response = await axiosInstance.get('/jobs')
            return response
        } catch (error:any) {
            console.error(error);
            
          }
      }