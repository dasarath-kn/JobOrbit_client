export interface AdminLogin {
    email:string,
    password:string
}


export interface subscription {
    _id:string
    subscriptiontype:string,
    price:string,
    limit:string,
    month:number,
    unlist:boolean,
    userdetails?:[{
        user_id:string,
        transaction_id:string,
        activated_date:Date,
        expiry_date:Date
    }]
}
export interface dashboard{
    userCount:number,
    companyCount:number,
    subscribedUsersCount:number
}
export interface subscriptedUser {
    session_id:string,
    plan_id:string
     user_id:string,
     activation_date:Date,
     expiry_date:Date,
     payment_status:Boolean
 }
