export interface CompanyLogin{
   
    email:string,
    password:string,
     
}

export interface Company {
    _id?:string,
    companyname:string,
    email:string,
    password:string,
    phonenumber:number|string,
    industry:string,
    state:string,
    city:string,
    address:string,
    about:string,
    is_blocked?:boolean,
    website_url?:string,
    is_verified?:boolean,
    admin_verified?:boolean
}