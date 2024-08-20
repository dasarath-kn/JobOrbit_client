import * as Yup from 'yup';
const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@gmail\.com$/
;
const loginValidation = Yup.object({
    email: Yup.string().matches(emailRegex,"Invalid email format").email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  export default loginValidation

  export const emailValidation = Yup.object({
    email: Yup.string().matches(emailRegex,"Invalid email format").email('Invalid email address').required('Email is required'),
  });
  export const passwordValidation =Yup.object({
    password: Yup.string().required('Password is required'),
 
  })

  export const ProfileSchema = Yup.object().shape({
    
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    field: Yup.string().required('Field is required'),
    location: Yup.string().required('Location is required'),
    github_url: Yup.string().required('GitHub URL is required'),
    portfolio_url: Yup.string().required('Portfolio URL is required'),
    about: Yup.string().required('About is required'),
    qualification: Yup.string().required('Education is required'),
  });
