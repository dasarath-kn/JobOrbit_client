import * as Yup from 'yup';
import { User } from '../../Interface/UserInterface';
import { Company } from '../../Interface/CompanyInterface';


export const userValidationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phonenumber: Yup.number().typeError('Phone number must be a number').required('Phone number is required'),
    field: Yup.string().required('Field is required'),
    location: Yup.string().required('Location is required'),
  });
  
 export const userInitialValues:User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phonenumber: '',
    field: '',
    location: '',
  };
  
