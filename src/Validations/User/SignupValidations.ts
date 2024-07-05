import * as Yup from 'yup';
import { User } from '../../Interface/UserInterface';
const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@gmail\.com$/

const phoneNumberRegex = /^\d{10}$/;
const addressRegex =/^[A-Za-z]+$/
export const userValidationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().matches(emailRegex,"Invalid email format").email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmpassword: Yup.string().min(6, 'Confirm password must be at least 6 characters').required('Confirmpassword is required'),
    phonenumber: Yup.string().matches(phoneNumberRegex, 'Phone number must be exactly 10 digits').typeError('Phone number must be a number').required('Phone number is required'),
    field: Yup.string().matches(addressRegex,"Field should not contain numbers").required('Field is required'),
    location: Yup.string().matches(addressRegex,"Address should not contain numbers").required('Location is required'),
  });
  
 export const userInitialValues:User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phonenumber: '',
    field: '',
    location: '',
    confirmpassword:''
  };
  
set