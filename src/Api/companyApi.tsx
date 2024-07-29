import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import jobShedule, { Company, CompanyLogin, jobdata, post } from "../Interface/CompanyInterface";
import GoogleAuth from "../Interface/GoogleauthToken";
import { MdSchedule } from "react-icons/md";
const token =localStorage.getItem('Companytoken')

export const companyLogin = async (companyData: CompanyLogin) => {
    try {
        let response = await axiosInstance.post('/company/login', companyData)
        console.log(response.data);

        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)

    }
}

export const companySignup = async (companyData: Company) => {
    try {
        let response = await axiosInstance.post('/company/signup', companyData)
        console.log(response.data);
        return response


    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)

    }
}
export const verifyOtp = async (otp: string) => {
    try {
        let Otp = { otp: otp }
        let response = await axiosInstance.post('/company/otp', Otp)
        return response
    } catch (error) {
        console.error(error);

    }

}
export const companyGooglesignup = async (companydata: GoogleAuth) => {
    try {
        let response = await axiosInstance.post('/company/googlesignup', companydata)
        return response
    } catch (error: any) {
        console.error(error.response.data.message);

    }
}

export const getCompanydata = async () => {
    try {
        const token = localStorage.getItem("Companytoken")
        const response = await axiosInstance.get("/company/getcompanydata", {
            headers: {
                "Authorization": token
            }
        })
        return response
    } catch (error: any) {
        console.error(error.response.data.message);

    }
}
export const verifyCompany = async (email: string) => {
    try {
        const Email = {
            email: email
        }

        let response = await axiosInstance.post('/company/verfiyuser', Email)
        return response
    } catch (error: any) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const companyresetPassword = async (userdata: Company) => {
    try {
        let response = await axiosInstance.patch('/company/resetpassword', userdata)
        return response

    } catch (error: any) {
        console.error(error.response.data.message);

    }
}
export const postJob = async (jobData: jobdata) => {
    try {
        let token = localStorage.getItem('Companytoken')
        let response = await axiosInstance.post('/company/addjob', jobData, {
            headers: {
                "Authorization": token
            }
        })
        return response
    } catch (error: any) {
        console.error(error.response.data.message);
    }
}

export const getJob = async () => {
    try {
        let token = localStorage.getItem('Companytoken')
        let response = await axiosInstance.get('/company/getjobdata', {
            headers: {
                "Authorization": token
            }
        })
        return response
    } catch (error: any) {
        console.error(error.response.data.message);

    }

}
export const removeJob=async(id:string)=>{
    try {
        let response = await axiosInstance.delete(`/company/deletejob?id=${id}`)
        return response
    } catch (error: any) {
        console.error(error.response.data.message);

    }
}
export const editProfile =async(companydata:Company,token:string)=>{
    try {        
        let response =await axiosInstance.post('/company/editprofile',companydata,{
            headers:{
                'Content-Type':'multipart/form-data',
                "Authorization":token
            }
        })
        return response
    } catch (error:any) {
        console.error(error.response.data.message);

    }
}

export const addPost = async(postData:post,token:string)=>{
try {
    let response = await axiosInstance.post('/company/addpost',postData,{headers:{
        "Content-Type":'multipart/form-data',
        "Authorization":token
    }})
    return response
} catch (error:any) {
    console.error(error.response.data.message);

}
}

export const posts =async(token:string)=>{
    try {
        let response = await axiosInstance.get('/company/posts',{headers:{
            "Authorization":token
        }})
        return response
    } catch (error:any) {
        console.error(error.response.data.message);
    }
    }

    export const uploadDocument =async(Data:Company)=>{
        try {
            let response = await axiosInstance.patch('/company/uploaddocument',Data,{headers:{
                "Authorization":token
            }})
            return response
        } catch (error:any) {
            console.error(error.response.data.message);
        }
    }

    export const deletePost = async (id:string)=>{
        try {
            let response = await axiosInstance.delete(`/company/deletepost?id=${id}`,{headers:{"Authorization":token}})
            return response
        } catch (error:any) {
            console.error(error.response.data.message);
        }
    }

    export const getApplicants = async(job_id:string)=>{
        try {
            const response = await axiosInstance.get(`/company/applicants?job_id=${job_id}`,{headers:{"Authorization":token}})
            return response
        } catch (error:any) {
                console.error(error.response.data.message);
            }
        
    }

    export const saveScheduledjob =async(scheduleData:jobShedule)=>{
        try {
            const response = await axiosInstance.post('/company/schedulejob',scheduleData,{headers:{"Authorization":token}})
            return response 
        } catch (error:any) {
            console.error(error.response.data.message);
        }
    }

    export const getScheduledJobs = async(job_id:string)=>{
        try {
            const response = await axiosInstance.get(`/company/schedulejob?job_id=${job_id}`,{headers:{"Authorization":token}})
            return response
            
        } catch (error:any) {
            console.error(error.response.data.message);
        }
    }
    export const schedulejobs =async()=>{
        try {
            const response =await axiosInstance.get('/company/findschedulejob',{headers:{"Authorization":token}})
            return response
        } catch (error:any) {
            console.error(error.response.data.message);
        }
    }