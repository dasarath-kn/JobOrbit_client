import NavBar from '../../components/company/NavBar'
import Footer from '../../components/common/Footer'
import ScheduledApplicants from '../../components/company/ScheduledApplicants'

const ScheduledJobPage = () => {
  return (
   <>
      <div className='sticky top-0 z-50'>
    <NavBar/>
        </div>
        <ScheduledApplicants/>
        <Footer/>
   </>
  )
}

export default ScheduledJobPage