import  {  MouseEvent, useEffect, useState } from 'react';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { addPost, deletePost, getComments, posts, replyComment } from '../../Api/companyApi';
import toast, { Toaster } from 'react-hot-toast';
import { post } from '../../Interface/CompanyInterface';
import { formatDistanceToNow } from 'date-fns';
import { MdDelete } from 'react-icons/md';
import { comment } from '../../Interface/UserInterface';

const Post = () => {
    const [postmodal, setPostmodal] = useState<boolean>(false);
    const [postdata, setPostdata] = useState<post[]>([]);
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState('');
    const [updated, setUpdated] = useState<boolean>(false)
    const [buttonLoad, setButtonload] = useState<boolean>(false)
    const [openmodal, setOpenmodal] = useState<boolean>(false)
    const [selectedvalues, setSelectedvalues] = useState<post>()
    const [comments, setComments] = useState<comment[]>()
    const [replyMessage, setReplyMessage] = useState<string>('')
    const [sentReply, setSentReply] = useState<boolean>(false)
    const handleImageChange = (e: any) => {
        const files: string[] = Array.from(e.target.files);
        setImages(files);

        const previews: string[] = files.map(file => URL.createObjectURL(file as any));
        setImagePreviews(previews);
    };

    const handleJobdescription = (e: any) => {
        setDescription(e.target.value);
    };
    const handleRemoveImage = (index:number) => {
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Adjust your images array accordingly
    };


    const handleSubmit = async (e:MouseEvent<HTMLButtonElement>) => {
      if(description ===""){
        return false
      } 
      e.preventDefault();
        setButtonload(!buttonLoad)
        try {
            if (description == '') {
                setErrors("Post description required")
            }
            const formData = new FormData();
            formData.append('description', description);
            images.forEach((image, index) => {
                formData.append(`image-${index}`, image);
            });
            let token = localStorage.getItem('Companytoken');
            let response = await addPost(formData as any, token as string);
            if (response?.data.success) {
                setImagePreviews([])
                setImages([])
                setPostmodal(!postmodal);
                setButtonload(false)
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                let token = localStorage.getItem('Companytoken');
                let response = await posts(token as string);
                if (response?.data) {
                    setPostdata(response?.data.posts.map((post:post) => ({ ...post, currentIndex: 0 })));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPostData();
    }, [postmodal, updated]);

    const goToSlide = (postId: string, index: number) => {
        setPostdata(prevData =>
            prevData.map(post =>
                post._id === postId ? { ...post, currentIndex: index } : post
            )
        );
    };
    const handleDeletePost = async (id: string) => {
        try {
            let response = await deletePost(id)
            if (response?.data.message) {
                toast.success(response.data.message)
                setUpdated(!updated)
            }

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        const comments = async () => {
            try {
                const post_id = selectedvalues?._id
                let response = await getComments(post_id as string)
                if (response?.data) {
                    setComments(response?.data.comments)
                }



            } catch (error) {
                console.error(error);

            }
        }
        comments()
    }, [openmodal, sentReply])
    const handleInbox = async (values: post) => {
        setOpenmodal(!openmodal)
        setSelectedvalues(values)
    }

    const handleReply = async (commentid: string) => {
        try {
            const replyData = {
                comment_id: commentid,
                reply: replyMessage
            }

            const response = await replyComment(replyData)
            if (response?.data.success) {
                setSentReply(!sentReply)
                setOpenmodal(true)
                setReplyMessage('')
            }
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <>
          <div className='h-auto min-h-screen w-full flex flex-col lg:flex-row lg:justify-center pb-9'>
  <div className='w-full lg:w-3/4 h-auto rounded-2xl flex flex-col justify-center lg:m-5 m-0'>
    <div className='mt-9 sm:ml-4 ml-16'>
      <button className='text-black border-2 hover:bg-black hover:text-white border-black w-28 rounded-xl' data-modal-target="crud-modal" data-modal-toggle="crud-modal" onClick={() => setPostmodal(!postmodal)}>Share Post</button>
    </div>
    {postdata.length > 0 ? postdata.map((val) => (
      <div key={val._id} className='m-4 lg:m-11 w-full lg:w-4/5 h-fit shadow-lg p-4 lg:p-9'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center p-3'>
          <div className='flex items-center space-x-3'>
            <img src={val.company_id.img_url || '/landingpage1.png'} className='w-12' alt='Company Logo' />
            <p>{val.company_id.companyname}</p>
          </div>
          <div className='flex flex-col lg:flex-row lg:items-center mt-3 lg:mt-0'>
            <MdDelete onClick={() => handleDeletePost(val._id)} />
            <p className='lg:ml-4'>{formatDistanceToNow(new Date(val.time), { addSuffix: true })}</p>
          </div>
        </div>
        <p className='p-4 lg:p-9 font-medium'>{val.description}</p>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden relative w-full h-48 lg:h-96">
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
        <div className='m-6 flex flex-row  space-x-12'>
          <FaRegHeart className='w-7 h-9' />
          <FaRegComment data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" onClick={() => handleInbox(val)} className='w-7 h-9' />
        </div>
        <p className='font-medium ml-6'>{val.like.length} like</p>
      </div>
    )) : (
      <div className='flex justify-center'>
        <p className='text-black font-semibold text-2xl'>No Posts Found </p>
      </div>
    )}
  </div>

  {openmodal && (
    <div id="crypto-modal" aria-hidden="true" className="bg-gray-100/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-black">Comments</h3>
            <button type="button" onClick={() => setOpenmodal(!openmodal)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 overflow-y-auto max-h-96">
            <ul className="my-4 space-y-3">
              {comments && comments.length > 0 ? comments.map((val) => (
                <li key={val._id}>
                  <div className="flex flex-col items-start p-3 text-base text-black rounded-lg bg-gray-200 hover:bg-gray-300">
                    <div>
                      <p className='font-medium'>{val.user_id.firstname}</p>
                      <p className="whitespace-nowrap">{val.message}</p>
                    </div>
                    {val.reply && (
                      <div className='flex flex-col items-end justify-end mt-2'>
                        <p className='font-medium'>{val.company_id.companyname}</p>
                        <p className="whitespace-nowrap">{val.reply}</p>
                      </div>
                    )}
                    {!val.replied && (
                      <div className='mt-3'>
                        <p className='font-semibold'>Reply</p>
                        <div className='flex items-center mt-2'>
                          <input
                            type="text"
                            placeholder='Reply'
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className='w-3/4 h-8 p-2 border border-gray-300 rounded-md'
                          />
                          <button
                            disabled={replyMessage.length === 0}
                            onClick={() => handleReply(val._id)}
                            className='bg-black text-white ml-3 w-16 h-7 rounded-full disabled:bg-gray-400'
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )) : (
                <div className='flex justify-center'>
                  <p className='text-black font-semibold text-xl'>No Comments Found</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

            {postmodal && (
                <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold dark:text-black">
                                    Add Post
                                </h3>
                                <button onClick={() => setPostmodal(!postmodal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-black">Post description</label>
                                        <textarea name="postDescription" id="post-description" onChange={handleJobdescription} className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter post description" />
                                        {errors && <div className="text-red-500 text-sm">{errors}</div>}

                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-black">Upload Images</label>
                                        <input type="file" accept="image/*" name="images" id="images" multiple onChange={handleImageChange} className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative col-span-1">
                                            <img src={preview} alt={`preview ${index}`} className="w-full h-auto rounded-lg" />
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 m-1 text-white bg-red-600 hover:bg-red-800 rounded-full p-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button disabled={buttonLoad} type="submit" onClick={(e)=>handleSubmit(e)} className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {buttonLoad && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>}

                                    {buttonLoad ? "Submiting..." : "Submit"}
                                </button>
                            </form>
                        </div>

                    </div>
                    <Toaster position="top-right" reverseOrder={false} />
                </div>

            )}

        </>
    );
}

export default Post;
