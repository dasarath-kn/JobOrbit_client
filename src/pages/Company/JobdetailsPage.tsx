import NavBar from '../../components/company/NavBar'
import Footer from '../../components/common/Footer'
import JobDetails from '../../components/company/JobDetails'

const JobdetailsPage = () => {
    return (
        <>
            <div className='sticky top-0 z-50'>
            <NavBar />
            </div>
            <JobDetails />
            <Footer />
        </>
    )
}

export default JobdetailsPage