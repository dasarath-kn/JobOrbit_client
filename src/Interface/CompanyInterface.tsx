import { string } from "yup"

export interface CompanyLogin{
   
    email:string,
    password:string,
     
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
    document_url:string,
    percentage:number
}

export interface jobdata {
    _id: string;
  jobtitle: string;
  applicants_id:[{
   _id:string
  }]
  company_id: {
    companyname: string;
    state: string;
    img_url:string;
    city:string;
    about:string;

    
  };
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
  company_id: {
    companyname: string;
    state: string;
    img_url:string;
    city:string;
    about:string;

    
  };
  time:string
}

interface jobShedule{
  user_id:String,
  job_id:String,
  company_id:String
  date:Date,
  time:string,
  message:string,
  scheduled_time:Date
}
export default jobShedule