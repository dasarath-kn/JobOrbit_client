import Footer from '../../components/common/Footer'
import NavBar from '../../components/company/NavBar'
import ViewUserprofile from '../../components/company/ViewUserprofile'

const ViewUsersprofilepage = () => {
  return (
   <>
   <div className='sticky top-0 z-50'>

   <NavBar/>
</div>
   <ViewUserprofile/>
   <Footer/>
   </>
  )
}

export default ViewUsersprofilepage