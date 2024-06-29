import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import { Company, CompanyLogin } from "../Interface/CompanyInterface";


export  const companyLogin =async(companyData:CompanyLogin)=>{
    try {
        let response = await axiosInstance.post('/company/login',companyData)
        console.log(response.data);
        
        return response
    } catch (error:any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}

export const companySignup = async(companyData:Company)=>{
    try {
        let response = await axiosInstance.post('/company/signup',companyData)
        console.log(response.data);
        return response
        
        
    } catch (error:any) {
        console.log(error.response.data.message);
        
    }
}