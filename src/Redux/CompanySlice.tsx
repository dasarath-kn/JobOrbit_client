import { createSlice } from "@reduxjs/toolkit";
import { Company } from "../Interface/CompanyInterface";
const initialState:Company ={
    _id:"",
    companyname:"",
    email:"",
    phonenumber:"",
    industry:"",
    state:"",
    city:"",
    address:"",
    about:"",
    img_url:"",
    website_url:"",
    document_url:""

}

const CompanySlice = createSlice({
    name:'company',
    initialState,
    reducers:{
        setCompanydetails:(state,action)=>{
            state._id=action.payload._id,
            state.companyname=action.payload.companyname,
            state.email=action.payload.email,
            state.phonenumber=action.payload.phonenumber,
            state.industry=action.payload.industry,
            state.state=action.payload.state,
            state.city=action.payload.city,
            state.address=action.payload.address,
            state.about=action.payload.about,
            state.img_url=action.payload.img_url,
            state.website_url=action.payload.website_url,
            state.document_url =action.payload.document_url
        },
        logoutCompany:(state)=>{
            state._id="",
            state.companyname="",
            state.email="",
            state.phonenumber="",
            state.industry="",
            state.state="",
            state.city="",
            state.address="",
            state.about="",
            state.img_url="",
            state.website_url="",
            state.document_url=""
        }

    }
})

export const {setCompanydetails,logoutCompany} =CompanySlice.actions
export default CompanySlice.reducer