import * as Yup from 'yup';
const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@gmail\.com$/
;
const loginValidation = Yup.object({
    email: Yup.string().matches(emailRegex,"Invalid email format").email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  export default loginValidation

