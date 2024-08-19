import React from 'react'

const About = () => {
  return (
    <>
<div className="w-full min-h-screen relative">
  {/* Our Mission Section */}
  <div className="w-full">
    <div className="relative">
      <img src="/about.jpg" className="w-full h-96 blur-sm" alt="About" />
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 mt-11">
        <p className="text-5xl font-semibold text-center text-white mb-4">Our Mission</p>
        <p className="text-lg font-medium text-center text-white max-w-3xl">
          "At JobOrbit, our mission is to revolutionize the job search experience by seamlessly connecting talented individuals with thriving opportunities across the globe. We are committed to creating a dynamic platform that empowers job seekers to discover their dream careers and enables employers to find the perfect fit for their teams. Through innovation, transparency, and a focus on user success, we aim to make JobOrbit the orbit where talent and opportunity meet."
        </p>
      </div>
    </div>
  </div>

  {/* Why Choose JobOrbit Section */}
  <div className="w-full py-20">
    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">Why Choose JobOrbit</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      
      {/* Advanced Search */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Jobs Tailored to Your Skills</h3>
        <p className="text-gray-600">
          JobOrbit’s advanced search algorithm is designed to match you with opportunities that align perfectly with your unique skills, experience, and career aspirations. Whether you're a seasoned professional or just starting out, our intuitive search filters allow you to narrow down job listings based on industry, location, salary range, and more. Say goodbye to endless scrolling—JobOrbit helps you find your ideal job faster and more efficiently.
        </p>
      </div>

      {/* Real-Time Notifications */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated on Job Applications and New Opportunities</h3>
        <p className="text-gray-600">
          Never miss an opportunity with JobOrbit's real-time notifications. As soon as a new job that matches your criteria is posted or an employer shows interest in your application, you’ll be the first to know. Our platform ensures you stay informed every step of the way, giving you a competitive edge in the job market. From interview requests to new job postings, JobOrbit keeps you connected and up-to-date.
        </p>
      </div>

      {/* Secure and Private */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Data is Safe with Us</h3>
        <p className="text-gray-600">
          At JobOrbit, we take your privacy and data security seriously. Our platform is built with robust security measures to ensure that your personal information and job search activities are protected at all times. You can search, apply, and communicate with potential employers with confidence, knowing that your data is encrypted and securely stored. We adhere to the highest standards of data protection so you can focus on what matters most—your career.
        </p>
      </div>

      {/* User-Friendly Interface */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy to Navigate and Use</h3>
        <p className="text-gray-600">
          Job hunting can be stressful, but JobOrbit’s user-friendly interface makes the process simple and stress-free. Our platform is designed with the user in mind, featuring a clean, intuitive layout that’s easy to navigate whether you're browsing jobs on your desktop or mobile device. Quickly access job listings, save your favorite positions, and track your applications with ease. At JobOrbit, we believe that finding your next job should be as smooth as possible.
        </p>
      </div>

      {/* Wide Range of Opportunities */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">From Startups to Enterprises</h3>
        <p className="text-gray-600">
          JobOrbit offers a diverse range of job opportunities, catering to every stage of your career. Whether you’re looking to join an innovative startup, contribute to a growing mid-sized company, or make your mark at a global enterprise, we’ve got you covered. Our platform connects job seekers with employers across various industries and regions, ensuring that you can find the right fit no matter where your ambitions take you.
        </p>
      </div>
      
    </div>
  </div>
</div>




    
    </>
  )
}

export default About