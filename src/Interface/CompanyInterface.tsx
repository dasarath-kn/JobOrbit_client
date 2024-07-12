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
    admin_verified?:boolean
}

export interface jobdata {
    _id: string;
  jobtitle: string;
  company_id: {
    companyname: string;
    state: string;
  };
  type: string;
  location: string;
  description: string;
  time: string;
}