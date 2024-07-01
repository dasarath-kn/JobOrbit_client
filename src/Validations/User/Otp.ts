import * as Yup from 'yup';

const otpValidation = Yup.object({
    otp: Yup.string().min(6,'Otp must contain 6 digits').max(6,'Otp should only contain 6 digits').required("Otp is required")
})
export default otpValidation
