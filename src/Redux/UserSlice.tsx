import { createSlice } from '@reduxjs/toolkit'
import { User } from '../Interface/UserInterface'
const initialState: User = {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    field: "",
    location: "",
    img_url: "",
    about: "",
    github_url: "",
    portfolio_url: "",
    resume_url: "",
    skills: [""],
    qualification: "",
    percentage: "",
    plan_id: "",
    jobapplied_Count: "",
    experience: [{}]

}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserdetails: (state, action) => {

            state._id = action.payload._id,
                state.firstname = action.payload.firstname,
                state.lastname = action.payload.lastname,
                state.email = action.payload.email,
                state.phonenumber = action.payload.phonenumber,
                state.field = action.payload.field,
                state.location = action.payload.location,
                state.img_url = action.payload.img_url,
                state.about = action.payload.about,
                state.github_url = action.payload.github_url,
                state.portfolio_url = action.payload.portfolio_url,
                state.resume_url = action.payload.resume_url,
                state.skills = action.payload.skills,
                state.percentage = action.payload.percentage,
                state.qualification = action.payload.qualification,
                state.experience = action.payload.experience
            state.jobapplied_Count = action.payload.jobapplied_Count
            state.plan_id = action.payload.plan_id
        },
        logoutUser: (state) => {

            state._id = "",
                state.firstname = "",
                state.lastname = "",
                state.email = "",
                state.phonenumber = "",
                state.field = "",
                state.location = "",
                state.img_url = "",
                state.about = "",
                state.github_url = "",
                state.portfolio_url = "",
                state.resume_url = "",
                state.skills = [""],
                state.qualification = "",
                state.percentage = "",
                state.plan_id = "",
                state.jobapplied_Count = "",
                state.experience = [{}]


        }
    }
})

export const { setUserdetails, logoutUser } = UserSlice.actions
export default UserSlice.reducer