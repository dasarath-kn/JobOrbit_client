import axios,{ AxiosInstance } from "axios";

const axiosInstance : AxiosInstance =axios.create({
    baseURL:"https:/joborbit.shozey.shop",
    withCredentials :true
})

export default axiosInstance