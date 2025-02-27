import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import { AdminLogin, subscription } from "../Interface/AdminInterface";
import handleTokenError from "./errorHandling";
const token =localStorage.getItem('Admintoken')
export const adminLogin = async(adminData:AdminLogin)=>{
        try {
            let response = await axiosInstance.post('/admin/login',adminData)
            return response            
        } catch (error:any) {
            toast.error(error.response.data.message)
            
        }
}
export const getUsers = async(page:number)=>{
    try {
        let response = await axiosInstance.get(`/admin/userdata?page=${page}`,{headers:{"Authorization":token}})
        return response
        
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}
export const getCompanies =async(page:number)=> {
    try {
        
        let response = await axiosInstance.get(`/admin/companydata?page=${page}`,{headers:{"Authorization":token}})
       
        return response
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}
export const userBlockUnblock = async(id:string,status:string)=>{
    try {
        
        let response = await axiosInstance.patch(`/admin/userblockunblock?user_id=${id}&status=${status}`,{headers:{"Authorization":token}})       
        return response        
        
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}

export const companyBlockUnblock =async(id:string,status:string)=>{
    try {
        let response = await axiosInstance.patch(`/admin/companyblockunblock?company_id=${id}&status=${status}`,{headers:{"Authorization":token}})        
        return response
        
        
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}

export const subscriptions = async(subscriptionData:subscription)=>{
    try {
        
        let response = await axiosInstance.post('/admin/subscription',subscriptionData,{headers:{"Authorization":token}})
        return response
    }catch (error: any) {
        handleTokenError(error, "Admin")

    }
}

export const getSubscriptionplans =async()=>{
try {
    let response  =await axiosInstance.get('/admin/getsubscriptionplan',{headers:{"Authorization":token}})
    return response
}catch (error: any) {
    handleTokenError(error, "Admin")

}
}

export const deletePlan = async(id:string)=>{
    try {
        let response = await axiosInstance.delete(`/admin/getsubscriptionplan?id=${id}`,{headers:{"Authorization":token}})
       return response 
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}
export const unlistandList =async(id:string,message:string)=>{
    try {
        const data ={id,message}
    let response = await axiosInstance.patch('/admin/getsubscriptionplan',data,{headers:{"Authorization":token}})     
        return response
} catch (error: any) {
    handleTokenError(error, "Admin")

}
}

export const dashboardData =async()=>{
    try {
        const response = await axiosInstance.get('/admin/dashboarddata',{headers:{"Authorization":token}})
        return response
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}

export const getPostreportdata =async ()=>{
    try {
        const response = await axiosInstance.get('/admin/getpostdata',{headers:{"Authorization":token}})
        return response
    } catch (error: any) {
        handleTokenError(error, "Admin")

    }
}
export const removePost =async (post_id:string)=>{
    try {
        const response = await axiosInstance.delete(`/admin/removepost?id=${post_id}`,{headers:{"Authorization":token}})
        return response
    }
    catch (error: any) {
        handleTokenError(error, "Admin")

    }
}