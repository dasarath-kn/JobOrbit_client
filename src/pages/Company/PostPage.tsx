import NavBar from '../../components/company/NavBar'
import Post from '../../components/company/Post'
import Footer from '../../components/common/Footer'

const PostPage = () => {
  return (
    <>
    <div className='sticky top-0 z-50'>
    <NavBar/>
        </div>
        <Post/>
        <Footer/>
        </>
  )
}

export default PostPage
