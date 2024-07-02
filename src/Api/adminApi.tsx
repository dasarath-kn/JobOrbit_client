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