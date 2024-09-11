import * as Yup from 'yup';

const JobvalidationSchema = Yup.object({
    jobtitle: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Job title must not contain numbers')
      .required('Job title is required'),
    description: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Description must not contain numbers')
      .required('Description is required'),
    responsibilities: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Responsibilities must not contain numbers')
      .required('Responsibilities are required'),
    requirements: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Requirements must not contain numbers')
      .required('Requirements are required'),
    qualification: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Qualification must not contain numbers')
      .required('Qualification is required'),
    skills: Yup.string()
      .trim()
      .matches(/^[^\d]*$/, 'Skills must not contain numbers')
      .required('Skills are required'),
    closedate: Yup.string()
      .trim()
      .required('Close date is required'), // No number restriction here
    type: Yup.string()
      .trim()
      .oneOf(['Fulltime', 'Parttime'], 'Invalid Job Type')
      .required('Job type is required'),
    location: Yup.string()
      .trim()
      .oneOf(['Onsite', 'Hybrid', 'Remote'], 'Invalid Location Type')
      .required('Location is required'),
});


export default JobvalidationSchema