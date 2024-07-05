import toast from "react-hot-toast";
import axiosInstance from "../Config/AxiosInstance";
import { Company, CompanyLogin } from "../Interface/CompanyInterface";
import GoogleAuth from "../Interface/GoogleauthToken";

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        toast.error(error.response.data.message)
    }
)
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
        console.log(error);

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