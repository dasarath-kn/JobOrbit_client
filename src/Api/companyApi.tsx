import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import { Company, CompanyLogin, jobdata } from "../Interface/CompanyInterface";
import GoogleAuth from "../Interface/GoogleauthToken";


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
        console.log(companydata);
        
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
