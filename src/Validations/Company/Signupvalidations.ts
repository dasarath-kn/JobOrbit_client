import * as Yup from 'yup';
import { Company } from '../../Interface/CompanyInterface';
 export const companyValidationSchema = Yup.object().shape({
    companyname: Yup.string().required('Company name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phonenumber: Yup.number().typeError('Phone number must be a number').required('Phone number is required'),
    industry: Yup.string().required('Industry is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    about: Yup.string().min(10, 'About section must be at least 10 characters').max(300, 'About section cannot be longer than 300 characters').required('About section is required'),
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
  };
  