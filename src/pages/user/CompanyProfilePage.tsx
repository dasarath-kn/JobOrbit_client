import MainNav from '../../components/common/MainNav'
import Footer from '../../components/common/Footer'
import ViewCompanyProfile from '../../components/user/ViewCompanyProfile'

const CompanyProfilePage = () => {
  return (
    <>
   <div className='sticky top-0 z-50'>

<MainNav/>
</div>
<ViewCompanyProfile/>
<Footer/>


    </>
  )
}

export default CompanyProfilePage