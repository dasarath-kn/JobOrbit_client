import NavBar from '../../components/company/NavBar'
import Profile from '../../components/company/Profile'
import Footer from '../../components/common/Footer'

const ProfilePage = () => {
  return (
    <>
       <div className='sticky top-0 z-50'>
    <NavBar/>
        </div>
        <Profile/>
        <Footer/>

    </>
  )
}

export default ProfilePage
