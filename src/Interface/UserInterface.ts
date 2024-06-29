 export interface UserLogin {
   
    email:string,
    password:string,
   

} 

export interface User{
    _id?:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    phonenumber:number | string,
    field:string,
    location:string,
    about?:string,
    is_verified?:boolean,
    is_blocked?:boolean,
    is_admin?:boolean,
    github_url?:string,
    portfolio_url?:string,
    resume_url?:string,
    skills?:[string],
    qualification?:[string]
    experience?:[object]

}