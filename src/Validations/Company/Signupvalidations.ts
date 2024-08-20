import * as Yup from 'yup';
import { Company } from '../../Interface/CompanyInterface';
const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@gmail\.com$/
const phoneNumberRegex = /^\d{10}$/;
const addressRegex =/^[A-Za-z][A-Za-z ,.]*$/
const nameRegex = /^[A-Za-z][A-Za-z ]*$/;



 export const companyValidationSchema = Yup.object().shape({
    companyname: Yup.string().matches(nameRegex,"Invalid name format").required('Company name is required'),
    email: Yup.string().matches(emailRegex,"Invalid email format").email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmpassword: Yup.string().min(6, 'Confirmpassword must be at least 6 characters').required('Confirmpassword is required'),
    phonenumber: Yup.string().matches(phoneNumberRegex, 'Phone number must be exactly 10 digits').typeError('Phone number must be a number').required('Phone number is required'),
    industry: Yup.string().matches(addressRegex,"Invalid industry format").required('Industry is required'),
    state: Yup.string().matches(addressRegex,"Invalid state format").required('State is required'),
    city: Yup.string().matches(addressRegex,"Invalid city format").required('City is required'),
    address: Yup.string().matches(addressRegex,"Invalid address format").required('Address is required'),
    about: Yup.string().matches(addressRegex,"Invalid about format").min(10, 'About section must be at least 10 characters').max(300, 'About section cannot be longer than 300 characters').required('About section is required'),
  });

  export const companyInitialValues:Company = {
    companyname: '',
    email: '',
    password: '',
    phonenumber: '',
    industry: '',
    state: '',
    city: '',
    address: '',
    about: '',
    confirmpassword:'',
    percentage:''
  };
  