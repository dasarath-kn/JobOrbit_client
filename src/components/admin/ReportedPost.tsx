import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { postreport, User } from '../../Interface/UserInterface'
import { getPostreportdata } from '../../Api/adminApi'
import { FaRegHeart } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { post } from '../../Interface/CompanyInterface'

const ReportedPost = () => {
    const [reportData,setReportData] =useState<postreport>()
    const [postData,setPostData] =useState<post>([])
    const [userData,setUserData] =useState<User>([])
    // const [postdata, setPostdata] = useState<post[]>([]);

    useEffect(()=>{
        const data = async ()=>{
            try {
                let response = await getPostreportdata()
                if(response?.data.success){                                        
                    setReportData(response.data.postReportData)
                    let post = response.data.postReportData?.map((val)=>{
                        return val.post_id
                       })
                       setPostData(post)
                       const user =response.data.postReportData.map((val)=>{
                        return val.user_id
                       })
                       setUserData(user)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        data()
    },[])
    console.log(userData,"user");
    
    console.log(postData,"uuu");
    
    const goToSlide = (postId: string, index: number) => {
        setPostData(prevData =>
            prevData.map(post =>
                post._id === postId ? { ...post, currentIndex: index } : post
            )
        );
    };
    
  return (
    <>
    <div className='flex flex-row'>
        <SideBar/>
        <div className='h-auto flex justify-center pb-9'>
                <div className='w-3/4 h-auto rounded-2xl flex flex-col justify-center m-5'>
                   
                    { postData && postData.length > 0 ? postData.map((val) => (
                        <div key={val._id} className='m-11 w-4/5 h-fit'>
                            <div className='flex flex-row justify-between items-center p-3'>
                                <div className='flex items-center space-x-3'>
                                    {val.img_url ? <img src='/landingpage1.png' className='w-12' alt='Company Logo' /> :
                                        <img src={val.img_url} className='w-12' alt='Company Logo' />
                                    }                                    <p>{val.companyname}</p>
                                </div>
                                <div className=''>
                                    {/* <MdDelete onClick={() => handleDeletePost(val._id)} /> */}
                                    {/* <p>{formatDistanceToNow(new Date(val.time), { addSuffix: true })}</p> */}
                                </div>
                            </div>
                            <p className='p-9 font-medium'>{val.description}</p>
                            <div className="relative w-full max-w-4xl mx-auto">
                                <div className="overflow-hidden relative w-full h-96">
                                    {val.images.map((img) => (
                                        <img
                                            // key={index}
                                            src={img}
                                            // alt={`Slide ${index + 1}`}
                                            // className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === val.currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))}
                                </div>
                                {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                                    {val.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(val._id, index)}
                                            className={`w-4 h-4 mx-1 rounded-full ${index === val.currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                                        />
                                    ))}
                                </div> */}
                            </div>
                            <div className='m-6 flex flex-row space-x-12'>

                                <FaRegHeart className='w-7 h-9' />
                                {/* <FaRegComment className='w-7 h-9' /> */}
                            </div>
                            <p className='font-medium ml-6'>{val.like.length} like</p>

                        </div>
                    )) : <>
                        <div className='flex justify-center'>
                            <p className='text-black font-semibold text-2xl'>No Posts Found </p>
                        </div></>}
                </div>
            </div>
    </div>
    </>
  )
}

export default ReportedPost