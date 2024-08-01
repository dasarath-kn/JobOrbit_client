import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { getComments, getPosts, getSavedpost, likeunlike, postComment, reportPost, savePost } from '../../Api/userApi'
import { post } from '../../Interface/CompanyInterface'
import { formatDistanceToNow } from 'date-fns'
import { comment, postreport, savedPost, User } from '../../Interface/UserInterface'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'
import toast, { Toaster } from 'react-hot-toast'
import { IoMdMore, IoMdSend } from 'react-icons/io'
import LoadingSpinner from '../common/LoadingSpinner'

const Post = () => {
  const [postdata, setPostdata] = useState<post[]>([])
  const userDatas: User = useSelector((state: RootState) => state.user)
  const [like, setLike] = useState<boolean>(false)
  const [saved, setSaved] = useState<savedPost[]>([])
  const [openmodal, setOpenmodal] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [selectedvalues, setSelectedvalues] = useState<post>()
  const [comments, setComments] = useState<comment[]>()
  const [sentcomment, setSentcomment] = useState<boolean>()
  const [load, setLoad] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const [reportModal, setReportModal] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedPostid,setSelectedpostid]=useState('')

  useEffect(() => {
    const posts = async () => {
      try {
        let response = await getPosts()
        if (response?.data) {
          setPostdata(response?.data.posts.map(post => ({ ...post, currentIndex: 0 })));

        }


      } catch (error) {
        console.error(error);

      }
    }
    const savedPost = async () => {
      try {
        const token = localStorage.getItem('Usertoken')
        let response = await getSavedpost(token as string)
        if (response?.data) {
          console.log(response.data);
          setSaved(response.data.savedPosts)

        }
      } catch (error) {
        console.error(error);

      }
    }

    posts()
    savedPost()

  }, [like])

  const goToSlide = (postId: string, index: number) => {
    setPostdata(prevData =>
      prevData.map(post =>
        post._id === postId ? { ...post, currentIndex: index } : post
      )
    );
  };
  const handleLike = async (id: string, status: string) => {
    console.log(id);

    let token = localStorage.getItem('Usertoken')
    let response = await likeunlike(id, status, token as string)
    if (response?.data.success) {
      setLike(!like)
    }

  }
  const handleSavepost = async (post_id: string) => {
    try {
      const token = localStorage.getItem("Usertoken")
      let response = await savePost(post_id, token as string)
      if (response?.data) {
        console.log(response.data.message);

        toast.success(response?.data.message)
      }
    } catch (error) {
      console.error(error);

    }
  }
  const handleInbox = async (values: post) => {
    console.log(values);

    setOpenmodal(!openmodal)
    setSelectedvalues(values)


  }
  const handleComment = async () => {
    const post_id = selectedvalues._id
    let commentData = { post_id, message }
    const token = localStorage.getItem('Usertoken')
    const response = await postComment(commentData as comment, token as string)
    if (response?.data) {
      setMessage('')
      setOpenmodal(true)
      setSentcomment(!sentcomment)

    }
  }
  useEffect(() => {
    const comments = async () => {
      try {
        const post_id = selectedvalues._id
        console.log(post_id);
        const token = localStorage.getItem("Usertoken")

        let response = await getComments(post_id as string, token as string)
        if (response?.data) {
          setComments(response?.data.comments)
        }



      } catch (error) {
        console.error(error);

      }
    }
    comments()
  }, [openmodal, sentcomment])

  // useEffect(()=>{
  //   let timer =setTimeout(()=>{
  //     setLoad(!load)
  //   },1000)
  //   return ()=>clearTimeout(timer)
  // },[])

  const handlemenu = () => {
    setMenu(!menu)
    setReportModal(!reportModal)
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleReport =async()=>{
  try {
     let postreportData ={post_id:selectedPostid,report_message:selectedValue}
     console.log(postreportData,"data");
     
      let response = await reportPost(postreportData as postreport) 
      if(response?.data.success){
        toast.success(response.data.message)
        setReportModal(!reportModal)
      }    
  } catch (error) {
    console.error(error);
    
  }
    
  }
  const handleMenu =(id:string)=>{
    setMenu(!menu)
    setSelectedpostid(id)
  }
  return (
    <div className='flex justify-center flex-row lg:m-9 min-h-screen'>
      {/* <Dashboard/> */}
      <div className='ml-14 mt-20 rounded-xl   h-1/2 border-300 w-2/3   '>
        {load && <LoadingSpinner />}
        {postdata.length > 0 && load == false ? postdata.map((val) => (
          <div key={val._id} className='m-11 w-4/5 h-fit '>
            <div className='flex flex-row justify-between items-center p-3'>
              <div className='flex items-center space-x-3'>
                {val.company_id.img_url ?
                  <img src={val.company_id.img_url} className='w-12 rounded-2xl' alt='Company Logo' /> :

                  <img src='/imgadd.jpg' className='w-12' alt='Company Logo' />}
                <p>{val.company_id.companyname}</p>
              </div>
              <div className="relative inline-block">
                <IoMdMore onClick={() => handleMenu(val._id)} className="w-7 h-7 cursor-pointer" />
                {
                  menu && (
                    <div className="absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg  dark:text-white mt-2">
                      <button data-modal-target="select-modal" data-modal-toggle="select-modal"
                        type="button" onClick={handlemenu}
                        className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100  focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-black  text-black"
                      >
                        Report
                      </button>
                    </div>
                  )
                }
                {reportModal &&
                   <div
                   id="select-modal"
                   aria-hidden="false"
                   className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                 >
                   <div className="relative p-4 w-full max-w-md max-h-full">
                     <div className="relative bg-white rounded-lg shadow">
                       <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                           Report Post
                         </h3>
                         <button  onClick={()=>setReportModal(!reportModal)}
                           type="button"
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           data-modal-toggle="select-modal"
                         >
                           <svg
                             className="w-3 h-3"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 14 14"
                           >
                             <path
                               stroke="currentColor"
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               strokeWidth="2"
                               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                             />
                           </svg>
                           <span className="sr-only">Close modal</span>
                         </button>
                       </div>
                       <div className="p-4 md:p-5">
                        
                         <form >
                           <ul className="space-y-4 mb-4">
                             <li>
                               <input
                                 type="radio"
                                 id="Spam"
                                 name="reportReason"
                                 value="Spam"
                                 className="text-black"
                                 checked={selectedValue === 'Spam'}
                                 onChange={handleChange}
                               />
                               <label className="text-black ml-2" htmlFor="Spam">
                                 Spam
                               </label>
                             </li>
                             <li>
                               <input
                                 type="radio"
                                 id="Harassment or Bullying"
                                 name="Harassment or Bullying"
                                 value="Harassment or Bullying"
                                 className="text-black"
                                 checked={selectedValue === 'Harassment or Bullying'}
                                 onChange={handleChange}
                               />
                               <label className="text-black ml-2" htmlFor="Harassment or Bullying">
                               Harassment or Bullying
                               </label>
                             </li>
                             <li>
                               <input
                                 type="radio"
                                 id="Misinformation"
                                 name="Misinformation"
                                 value="Misinformation"
                                 className="text-black"
                                 checked={selectedValue === 'Misinformation'}
                                 onChange={handleChange}
                               />
                               <label className="text-black ml-2" htmlFor="Misinformation">
                               Misinformation
                               </label>
                             </li>
                             <li>
                               <input
                                 type="radio"
                                 id="Other"
                                 name="Other"
                                 value="Other"
                                 className="text-black"
                                 checked={selectedValue === 'Other'}
                                 onChange={handleChange}
                               />
                               <label className="text-black ml-2" htmlFor="Other">
                               Other
                               </label>
                             </li>
                             {/* Add more radio options here if needed */}
                           </ul>
                           <button 
                           onClick={handleReport}
                             type="button"
                             className="text-white inline-flex w-full justify-center bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                           >
                             Submit
                           </button>
                         </form>
                       </div>
                     </div>
                   </div>
                 </div>

                }
              </div>
            </div>
            <p className='p-9 font-medium'>{val.description}</p>
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="overflow-hidden relative w-full h-96">
                {val.images.map((slide: string, index: number) => (
                  <img
                    key={index}
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === val.currentIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                {val.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(val._id, index)}
                    className={`w-4 h-4 mx-1 rounded-full ${index === val.currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <div className='m-6 flex flex-row space-x-12'>
              {val.like.includes(userDatas._id) ? <FaHeart onClick={() => handleLike(val._id, "Unlike")} className='w-7 h-9 text-black' /> : <FaRegHeart onClick={() => handleLike(val._id, "Like")} className='w-7 h-9' />
              }

              <FaRegComment data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" onClick={() => handleInbox(val)} className='w-7 h-9' />
              <div className=' flex justify-center'>

                {/* <FaRegBookmark onClick={()=>handleSavepost(val._id)} className='w-6 h-7 mt-1' /> */}
              </div>

            </div>
            <p className='font-medium ml-6'>{val.like.length} like</p>
          </div>
        )) : <>
          <div className='flex justify-center'>
            <p className='text-black font-semibold text-2xl'>No Posts Found </p>
          </div></>}

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        openmodal &&

        <div id="crypto-modal" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Comments
                </h3>
                <button type="button" onClick={() => setOpenmodal(!openmodal)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                {/* <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p> */}
                <ul className="my-4 space-y-3 ">
                  {comments?.length > 0 ? comments.map((val) => {
                    return (<>

                      <li >
                        <div className="flex-col items-center p-3 text-base  text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                          <p className='font-light'>{val.user_id.firstname}</p>
                          <span className="flex-1 whitespace-nowrap">{val.message}</span>
                          {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span> */}
                        </div>
                      </li>
                    </>)
                  }) : <>
                    <div className='flex justify-center'>
                      <p className='text-white font-semibold text-xl'>No Comments Found </p>
                    </div>
                  </>}


                </ul>
                <div>
                  <div className='flex'>
                    <textarea name="postDescription" id="post-description" onChange={(e) => { setMessage(e.target.value) }} className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add a comment" />
                    <button onClick={handleComment} className='ml-2 text-white'>Send</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Post
