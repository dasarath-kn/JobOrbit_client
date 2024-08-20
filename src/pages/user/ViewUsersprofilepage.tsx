import MainNav from '../../components/common/MainNav'
import ViewUserprofile from '../../components/user/ViewUserprofile'
import Footer from '../../components/common/Footer'

const ViewUsersprofilepage = () => {
  return (
   <>
   <div className='sticky top-0 z-50'>

<MainNav/>
</div>
   <ViewUserprofile/>
   <Footer/>
   </>
  )
}

export default ViewUsersprofilepage