import * as Yup from 'yup';
const subscriptionSchema = Yup.object().shape({
    subscriptiontype: Yup.string()
      .required('Subscription type is required')
      .min(2, 'Subscription type must be at least 2 characters long')
      .max(50, 'Subscription type cannot be longer than 50 characters'),
    
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number')
      .min(1, 'Price must be at least 1'),
  
    month: Yup.number()
      .required('Month is required')
      .positive('Month must be a positive number')
      .integer('Month must be an integer')
      .min(1, 'Month must be at least 1')
      .max(12, 'Month cannot exceed 12'),
  
    limit: Yup.number()
      .required('Limit is required')
      .positive('Limit must be a positive number')
      .integer('Limit must be an integer')
      .min(1, 'Limit must be at least 1'),
  });

  export default subscriptionSchema