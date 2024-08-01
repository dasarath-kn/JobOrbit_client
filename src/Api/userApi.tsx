import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";
import { comment, experienceData, postreport, reviews, User, UserLogin } from "../Interface/UserInterface";
import GoogleauthToken from "../Interface/GoogleauthToken";
import GoogleAuth from "../Interface/GoogleauthToken";
import handleTokenError from "./errorHandling";
const token = localStorage.getItem("Usertoken")
export const userLogin = async (userData: UserLogin) => {
    try {
        let response = await axiosInstance.post('/login', userData)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)

    }

}

export const userSignup = async (userData: User) => {
    try {
        let response = await axiosInstance.post('/signup', userData)
        return response

    } catch (error: any) {
        handleTokenError(error, "User")


    }
}

export const userverifyOtp = async (otp: string) => {
    try {
        let Otp = { otp: otp }

        let response = await axiosInstance.post('/otp', Otp)
        return response

    } catch (error: any) {
        handleTokenError(error, "User")


    }
}

export const resendOtp = async (email: string) => {
    try {
        let Email = { email: email }
        let response = await axiosInstance.post('/resendotp', Email)
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}

export const getUserdata = async () => {
    try {
        const token = localStorage.getItem("Usertoken")
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.get("/getuserdata", {
            headers: {
                "Authorization": token,
                "refresh-token": refreshtoken
            }
        })

        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}
export const verifyUser = async (email: string) => {
    try {
        const Email = {
            email: email
        }
        let response = await axiosInstance.post('/verfiyuser', Email)
        return response
    } catch (error: any) {
        if (error.response.data.blocked) {
            localStorage.removeItem('Usertoken');
            localStorage.removeItem('UserRefreshtoken');

        } else {
            handleTokenError(error, "User")

        }

    }
}

export const googleSignup = async (userdata: GoogleAuth) => {
    try {
        let response = await axiosInstance.post("/googlesignup", userdata)
        return response

    } catch (error: any) {
        handleTokenError(error, "User")

    }
}
export const resetPassword = async (userdata: User) => {
    try {
        let response = await axiosInstance.patch('/resetpassword', userdata)
        return response

    } catch (error: any) {
        handleTokenError(error, "User")

    }

}

export const editProfile = async (userdata: User) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.post('/editprofile', userdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token,
                "refresh-token": refreshtoken
            },
        });
        return response;
    } catch (error: any) {
        if (error.response.data.blocked) {
            localStorage.removeItem('Usertoken');
            localStorage.removeItem('UserRefreshtoken');

        } else {
            handleTokenError(error, "User")

        }



    }
};
export const addSkills = async (skills: [], percentage: number) => {
    try {
        const response = await axiosInstance.patch('/addskills', { skill: skills, percentage }, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }

}

export const getJobs = async () => {
    try {
        const token = localStorage.getItem('Usertoken')
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.get('/jobs', { headers: { "Authorization": token, "refresh-token": refreshtoken } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}

export const getPosts = async () => {
    try {
        const token = localStorage.getItem('Usertoken')
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.get('/posts', { headers: { "Authorization": token, "refresh-token": refreshtoken } })
        return response
    } catch (error: any) {

        handleTokenError(error, "User")
    }
}

export const likeunlike = async (post_id: string, status: string, token: string) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.patch(`/likeunlike?post_id=${post_id}&status=${status}`, {}, { headers: { "Authorization": token, "refresh-token": refreshtoken } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}
export const savePost = async (_id: string, token: string) => {
    const post_id = { post_id: _id }
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')
        let response = await axiosInstance.post('/savepost', post_id, {
            headers: {
                "Authorization": token,
                "refresh-token": refreshtoken
            }
        })
        return response
    } catch (error: any) {


        handleTokenError(error, "User")

    }
}
export const getSavedpost = async (token: string) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.get('/getsavedpost', {
            headers: {
                "Authorization": token, "refresh-token": refreshtoken
            }
        })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}
export const postComment = async (CommentData: comment, token: string) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        const response = await axiosInstance.post('/comment', CommentData, { headers: { "Authorization": token, "refresh-token": refreshtoken } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}
export const getComments = async (post_id: string, token: string) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.get(`/getcomment?post_id=${post_id}`, { headers: { "Authorization": token, "refresh-token": refreshtoken } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}
export const viewJobdetails = async (job_id: string) => {
    try {
        let response = await axiosInstance.get(`/viewjobdetails?job_id=${job_id}`, { headers: { "Authorization": token } })
        return response
    } catch (error) {
        handleTokenError(error, "User")

    }
}

export const addExperience = async (experienceData: experienceData) => {
    try {
        const refreshtoken = localStorage.getItem('UserRefeshtoken')

        let response = await axiosInstance.post('/addexperience', experienceData, {
            headers: {
                "Authorization": token, "refresh-token": refreshtoken
            }
        })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}
export const uploadResume = async (Data: User) => {
    try {
        let response = await axiosInstance.patch('/uploadresume', Data, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const jobApply = async (job_id: string) => {
    try {
        let response = await axiosInstance.patch(`/jobapply?job_id=${job_id}`, {}, { headers: { 'Authorization': token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")


    }
}

export const getSubscriptionplans = async () => {
    try {
        let response = await axiosInstance.get('/getsubscriptionplan', { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const subscriptionPayment = async (id: string) => {
    try {

        let response = await axiosInstance.post('/paysubscriptionplan', id, { headers: { "Authorization": token } })

        return response
    } catch (error: any) {
        handleTokenError(error, "User")
    }
}

export const subscribeduserdetails = async () => {
    try {

        let response = await axiosInstance.get('/subscribeduserdetails', { headers: { "Authorization": token } })

        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const reportPost = async (reportPostData: postreport) => {
    try {
        const response = await axiosInstance.post('/reportpost', reportPostData, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const appliedJobs = async () => {
    try {

        const response = await axiosInstance.get('/appliedjobs', { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const getUsers = async () => {
    try {

        const response = await axiosInstance.get('/getusers', { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}
export const getCompanies = async () => {
    try {

        const response = await axiosInstance.get('/getcompanies', { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}
export const getCompaniesById = async (id: string) => {
    try {

        const response = await axiosInstance.get(`/getcompany?id=${id}`, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const findUser = async (id: string) => {
    try {
        const response = await axiosInstance.get(`getuser?id=${id}`, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}

export const addreviews = async (reviewData: reviews) => {
    try {
        const response = await axiosInstance.post('/savereviews', reviewData, { headers: { "Authorization": token } })
        return response

    } catch (error: any) {
        handleTokenError(error, "User")

    }
}
export const getReviews = async (id: string) => {
    try {
        const response = await axiosInstance.get(`getreviews?id=${id}`, { headers: { "Authorization": token } })
        return response
    } catch (error: any) {
        handleTokenError(error, "User")

    }
}