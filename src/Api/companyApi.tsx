import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import jobShedule, { Company, CompanyLogin, jobdata, post, replyData } from "../Interface/CompanyInterface";
import GoogleAuth from "../Interface/GoogleauthToken";
import handleTokenError from "./errorHandling";
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
        handleTokenError(error, "Company")

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
        handleTokenError(error, "Company")

    }
}

export const companyresetPassword = async (userdata: Company) => {
    try {
        let response = await axiosInstance.patch('/company/resetpassword', userdata)
        return response

    } catch (error: any) {
        handleTokenError(error, "Company")

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
        handleTokenError(error, "Company")

    }
}

export const getJob = async (page:number) => {
    try {
        let token = localStorage.getItem('Companytoken')
        let response = await axiosInstance.get(`/company/getjobdata?page=${page}`, {
            headers: {
                "Authorization": token
            }
        })
        return response
    } catch (error: any) {
        handleTokenError(error, "Company")

    }

}
export const removeJob=async(id:string)=>{
    try {
        let response = await axiosInstance.delete(`/company/deletejob?id=${id}`)
        return response
    } catch (error: any) {
        handleTokenError(error, "Company")

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
    } catch (error: any) {
        handleTokenError(error, "Company")

    }
}

export const addPost = async(postData:post,token:string)=>{
try {
    let response = await axiosInstance.post('/company/addpost',postData,{headers:{
        "Content-Type":'multipart/form-data',
        "Authorization":token
    }})
    return response
}catch (error: any) {
    handleTokenError(error, "Company")

}
}

export const posts =async(token:string)=>{
    try {
        let response = await axiosInstance.get('/company/posts',{headers:{
            "Authorization":token
        }})
        return response
    } catch (error: any) {
        handleTokenError(error, "Company")

    }
    }

    export const uploadDocument =async(Data:Company)=>{
        try {
            let response = await axiosInstance.patch('/company/uploaddocument',Data,{headers:{
                "Authorization":token
            }})
            return response
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }

    export const deletePost = async (id:string)=>{
        try {
            let response = await axiosInstance.delete(`/company/deletepost?id=${id}`,{headers:{"Authorization":token}})
            return response
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }

    export const getApplicants = async(job_id:string)=>{
        try {
            const response = await axiosInstance.get(`/company/applicants?job_id=${job_id}`,{headers:{"Authorization":token}})
            return response
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
        
    }

    export const saveScheduledjob =async(scheduleData:jobShedule)=>{
        try {
            const response = await axiosInstance.post('/company/schedulejob',scheduleData,{headers:{"Authorization":token}})
            return response 
        }catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }

    export const getScheduledJobs = async(job_id:string)=>{
        try {
            const response = await axiosInstance.get(`/company/schedulejob?id=${job_id}`,{headers:{"Authorization":token}})
            return response
            
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }
    export const schedulejobs =async(job_id:string)=>{
        try {
            const response =await axiosInstance.get(`/company/findschedulejob?id=${job_id}`,{headers:{"Authorization":token}})
            return response
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }
    export const getReviews = async () => {
        try {
            const response = await axiosInstance.get('/company/getreviews', { headers: { "Authorization": token } })
            return response
        }catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    
    }
    export const getcompanymessages = async (id: string) => {
        try {
            
            const response = await axiosInstance.get(`/company/messages?_id=${id}`, { headers: { "Authorization": token } })
            return response
        } catch (error: any) {
            handleTokenError(error, "Company")
    
        }
    }
        export const getComments = async (post_id: String) => {
            try {
                console.log(post_id);
                
                let response = await axiosInstance.get(`/company/getcomment?post_id=${post_id}`, { headers: { "Authorization": token} })
                return response
            } catch (error: any) {
                handleTokenError(error, "Company")
        
        
            }
        }

        export const replyComment = async(replyData:replyData)=>{
            try {
                const response = await axiosInstance.patch('/company/replycomment',replyData,{headers:{"Authorization":token}})
                return response 
            }  catch (error: any) {
                handleTokenError(error, "Company")
        
        
            }
        }

        export const removeApplicant =async(job_id:string,user_id:string)=>{
            try {
                const data ={job_id:job_id,user_id:user_id}
                const response = await axiosInstance.patch('/company/schedulejob',data,{headers:{"Authorization":token}})
                return response
            }  catch (error: any) {
                handleTokenError(error, "Company")
                
            }
        }
    

        export const conversation = async()=>{
            try {
                const response = await axiosInstance.get('/company/conversation',{headers:{"Authorization":token}})
                return response
                
            } catch (error: any) {
                handleTokenError(error, "Company")
        
            }
        }

        export const getmessages = async (id: string) => {
            try {
                const response = await axiosInstance.get(`/messages?_id=${id}`, { headers: { "Authorization": token } })
                return response
            } catch (error: any) {
                handleTokenError(error, "User")
        
            }
        }