import MainNav from '../../components/common/MainNav'
import Connections from '../../components/user/Connections'
import Footer from '../../components/common/Footer'

const ConnectionPage = () => {
  return (
   <>
   <div className='sticky top-0 z-50'>

<MainNav/>
</div>
   <Connections/>
   <Footer/>
   </>
  )
}

export default ConnectionPage