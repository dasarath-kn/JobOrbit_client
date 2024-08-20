import NavBar from '../../components/company/NavBar'
import JobApplicants from '../../components/company/JobApplicants'
import Footer from '../../components/common/Footer'

const JobApplicantPage = () => {
  return (
   <>
      <div className='sticky top-0 z-50'>
    <NavBar/>
        </div>
        <JobApplicants/>
        <Footer/>
   </>
  )
}

export default JobApplicantPage