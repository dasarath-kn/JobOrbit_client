import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { addPost, deletePost, posts } from '../../Api/companyApi';
import toast, { Toaster } from 'react-hot-toast';
import { post } from '../../Interface/CompanyInterface';
import { formatDistanceToNow } from 'date-fns';
import { MdDelete } from 'react-icons/md';

const Post = () => {
    const [postmodal, setPostmodal] = useState<boolean>(false);
    const [postdata, setPostdata] = useState<post[]>([]);
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState('');
    const [updated, setUpdated] = useState<boolean>(false)
    const handleImageChange = (e: any) => {
        const files: string[] = Array.from(e.target.files);
        setImages(files);

        const previews: string[] = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleJobdescription = (e: any) => {
        setDescription(e.target.value);
    };
    const handleRemoveImage = (index) => {
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Adjust your images array accordingly
    };


    const handleSubmit = async (e: Event) => {
        e.preventDefault();
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
            if (response?.data) {
                console.log(response.data);
                setPostmodal(!postmodal);
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
                    setPostdata(response?.data.posts.map(post => ({ ...post, currentIndex: 0 })));
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

    return (
        <>
            <div className='h-auto min-h-screen flex justify-center pb-9'>
                <div className='w-3/4 h-auto rounded-2xl flex flex-col justify-center m-5'>
                    <div className='mt-9 sm:ml-4 ml-16 '>
                        <button className='text-black border-2 hover:bg-black hover:text-white border-black w-28 rounded-xl' data-modal-target="crud-modal" data-modal-toggle="crud-modal" onClick={() => setPostmodal(!postmodal)}>Share Post</button>
                    </div>
                    {postdata.length > 0 ? postdata.map((val) => (
                        <div key={val._id} className='m-11 w-4/5 h-fit'>
                            <div className='flex flex-row justify-between items-center p-3'>
                                <div className='flex items-center space-x-3'>
                                    {val.company_id.img_url ? <img src='/landingpage1.png' className='w-12' alt='Company Logo' /> :
                                        <img src={val.company_id.img_url} className='w-12' alt='Company Logo' />
                                    }                                    <p>{val.company_id.companyname}</p>
                                </div>
                                <div className=''>
                                    <MdDelete onClick={() => handleDeletePost(val._id)} />
                                    <p>{formatDistanceToNow(new Date(val.time), { addSuffix: true })}</p>
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

                                <FaRegHeart className='w-7 h-9' />
                                <FaRegComment className='w-7 h-9' />
                            </div>
                            <p className='font-medium ml-6'>{val.like.length} like</p>

                        </div>
                    )) : <>
                        <div className='flex justify-center'>
                            <p className='text-black font-semibold text-2xl'>No Posts Found </p>
                        </div></>}
                </div>
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
                                <button type="submit" onClick={handleSubmit} className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Submit
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
