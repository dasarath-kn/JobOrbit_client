import { User } from "./UserInterface"

export interface CompanyLogin{
   
    email:string,
    password:string,
     
}
export interface Users{
  user_id:User
}

export  interface replyData {
  comment_id:string,
  reply:string
}
export interface Company {
    _id?:string,
    companyname:string,
    email:string,
    password?:string,
    confirmpassword?:string
    phonenumber:number|string,
    industry:string,
    state:string,
    city:string,
    address:string,
    about:string,
    img_url?:string,
    is_blocked?:boolean,
    website_url?:string,
    is_verified?:boolean,
    admin_verified?:boolean,
    document_url?:string,
    percentage?:number|string,
    users?:Users[]

}

export interface jobdata {
    _id: string;
  jobtitle: string;
  applicants_id:[{
    user_id:User,
    resume_url:string
  }]
  company_id:Company
  type: string;
  location: string;
  description: string;
  time: string;
  responsibilities:string;
  requirements:string
  qualification:string
  skills:string
}
export interface post{
  _id:string,
  description:string,
  images:[],
  company_id:Company
  like:User[]
  time:string
  currentIndex?:number
}
export interface jobApplied {
  user_id:string,
  job_id:jobdata,
  company_id:Company,
  status:string
  applied_date:Date
}

interface jobShedule{
  user_id:User,
  job_id:String,
  company_id:String
  date:Date,
  time:string,
  message:string,
  scheduled_time:Date
}
export default jobShedule