import { string } from "yup"

 export interface UserLogin {
   
    email:string,
    password:string,
   

} 

export interface User{
    _id?:string,
    firstname?:string,
    lastname?:string,
    email?:string,
    password?:string,
    confirmpassword?:string,
    phonenumber?:number | string,
    field?:string,
    location?:string,
    img_url?:string
    about?:string,
    is_verified?:boolean,
    is_blocked?:boolean,
    is_admin?:boolean,
    github_url?:string,
    portfolio_url?:string,
    resume_url?:string,
    skills?:[string],
    percentage:string,
    qualification?:string,
    plan_id:string,
    jobapplied_Count:number|string,
    experience:[{
        experiencefield:string,
        duration:number,
        responsibilities:string
        length:number
    }]

}
export interface otp {
    otp:string
}

export interface savedPost{
    user_id:string,
    post_id:string
}

export interface comment {
    user_id:string,
    post_id:string,
    message:string,
    like:number
}
export interface experienceData{
    experiencefield:string,
        duration:string,
        responsibilities:string
        percentage:string
}
export interface postreport {
    post_id:string,
    user_id:string,
    report_message:String,
    date:Date

}

