import { Company, post } from "./CompanyInterface";

 export interface UserLogin {
   
    email:string,
    password:string,
   

} export interface Experience {
    experiencefield: string;
    mode: string;
    responsibilities: string;
    length: number;
    start_date: Date;
    end_date: Date;
}

export interface Connection {
    connection_id:User;
    _id: string;
    status: boolean;
}
export interface Companies{
    company_id:Company
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
    is_google?:boolean
    is_admin?:boolean,
    github_url?:string,
    portfolio_url?:string,
    resume_url?:[string],
    skills?:[string],
    percentage?:string,
    qualification?:string,
    plan_id?:string,
    online?:string,
    jobapplied_Count?:number|string,
    experience?:Experience[],
    connections?:Connection[],
    companies?:Companies[],
    rewards?:rewards[]

}
export interface rewards{
    awardTittle:string,
    issuedBy:string,
    details:string,
    img_url:string     
}
export interface otp {
    otp:string
}

export interface savedPost{
    _id:string
    user_id:string,
    post_id:post,
    company_id:Company
    currentIndex:number
}

export interface comment {
    _id:string
    user_id:User,
    post_id:string,
    company_id:Company,
    message:string,
    like:number
    reply:string
    replied:boolean
}
export interface experienceData{
    experiencefield?:string,
        mode?:string,
        startdate?:Date|string,
        enddate?:Date|string
        responsibilities?:string
        percentage?:string
}
export interface postreport {
    post_id:string,
    user_id?:string,
    report_message:String,
    date?:Date

}
export interface reviews {
    rating_count:number,
    review:String,
    user_id?:User,
    time?:string
    company_id?:Company
}

 export interface FormData {
    experienceField: string;
    mode: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
  }
  export interface connection {
    connection_id?: string;
    company_id?: string;
  }
  export interface connectionData {
    connection_id:string,
    notification_id:string,
    message:string
  }

  export interface message {
    sender_id:string,
    reciever_id:string,
    message:string,
    timeStamp:string,
    type?: 'sent' | 'received';

}
export interface conversationData {
    _id:string
    sender_id:any,
    reciever_id:any,
    message:string,
    time:Date
   

}
export interface companyconversationData {
    _id:string
    sender_id:string,
    reciever_id:Company,
    message:string,
    time:Date
   

}

export interface notification {
    _id:string
    sender_id:User,
    reciever_id:User,
    message:string,
    date:Date
}