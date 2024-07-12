import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import { AdminLogin } from "../Interface/AdminInterface";

export const adminLogin = async(adminData:AdminLogin)=>{
        try {
            let response = await axiosInstance.post('/admin/login',adminData)
            return response            
        } catch (error:any) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
            
        }
}
export const getUsers = async(page:number)=>{
    try {
        let response = await axiosInstance.get(`/admin/userdata?page=${page}`)
        return response
        
    } catch (error:any) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}
export const getCompanies =async(page:number)=> {
    try {
        
        let response = await axiosInstance.get(`/admin/companydata?page=${page}`)
       console.log(response.data);
       
        return response
    } catch (error:any) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message) 
    }
}
export const userBlockUnblock = async(id:string,status:string)=>{
    try {
        
        let response = await axiosInstance.patch(`/admin/userblockunblock?user_id=${id}&status=${status}`)       
        return response        
        
    } catch (error:any) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message)

        
    }
}

export const companyBlockUnblock =async(id:string,status:string)=>{
    try {
        let response = await axiosInstance.patch(`/admin/companyblockunblock?company_id=${id}&status=${status}`)        
        return response
        
        
    } catch (error:any) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message)
        
    }
}