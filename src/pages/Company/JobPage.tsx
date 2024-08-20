import NavBar from '../../components/company/NavBar'
import Job from '../../components/company/Job'
import Footer from '../../components/common/Footer'

const JobPage = () => {
  return (
 <>
    <div className='sticky top-0 z-50'>
    <NavBar/>
    </div>
    <Job/>
    <Footer/>
 </>
  )
}

export default JobPage
