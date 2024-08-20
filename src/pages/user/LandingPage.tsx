import Nav from '../../components/common/Nav'
import Landingpage from '../../components/user/LandingPage'
import Footer from '../../components/common/Footer'
const LandingPage = () => {
  return (
   <>
   <div className='sticky top-0 z-50'>

   <Nav/>
   </div>
   <Landingpage/>
   <Footer/>
   
   </>
  )
}

export default LandingPage