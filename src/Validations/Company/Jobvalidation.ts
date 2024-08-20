import * as Yup from 'yup';

const JobvalidationSchema = Yup.object({
    jobtitle: Yup.string().required('Job title is required'),
    description: Yup.string().required('Description is required'),
    responsibilities: Yup.string().required('Responsibilities are required'),
    requirements: Yup.string().required('Requirements are required'),
    qualification: Yup.string().required('Qualification is required'),
    skills: Yup.string().required('Skills are required'),
    type: Yup.string().oneOf(['Fulltime', 'Parttime'], 'Invalid Job Type').required('Job type is required'),
    location: Yup.string().oneOf(['Onsite', 'Hybrid', 'Remote'], 'Invalid Location Type').required('Location is required'),
});

export default JobvalidationSchema