import MainNav from '../../components/common/MainNav'
import Post from '../../components/user/Post'
import Footer from '../../components/common/Footer'

const Homepage = () => {
  return (
    <>
   <div className='sticky top-0 z-50'>

    <MainNav/>
    </div>
    <Post/>
    <Footer/>

    </>
  )
}

export default Homepage
