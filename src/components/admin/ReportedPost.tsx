import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { postreport, User } from '../../Interface/UserInterface'
import { getPostreportdata, removePost } from '../../Api/adminApi'
import { FaRegHeart } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { post } from '../../Interface/CompanyInterface'
import { format, formatDistanceToNow } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'

const ReportedPost = () => {
    const [reportData, setReportData] = useState<postreport[]>()
    const [updated,setUpdated]=useState<boolean>(false)
    useEffect(() => {
        const data = async () => {
            try {
                let response = await getPostreportdata()
                if (response?.data.success) {
                    setReportData(response.data.postReportData)

                }
            } catch (error) {
                console.error(error);

            }
        }
        data()
    }, [updated])


const handleDelete = async(id:string)=>{
    try {
        const response = await removePost(id as string)
        if(response?.data.success){
            setUpdated(!updated)
            toast.success(response.data.message)
        }
    } catch (error) {
        console.error(error);
        
    }
}

    return (
        <>
            <div className='flex flex-row'>
                <SideBar />

                <div className='ml-7 grid w-4/5  mb-12'>
                    <p className='text-2xl font-medium m-8'>Reported Posts</p>
                    {reportData && reportData.length > 0 ? reportData.map((values: any) => {
                        return (<>
                            <div className='m-7'>
                                <div className='w-full h-auto m-4'>

                                    <p>{values.post_id.description}</p>

                                </div>
                                <div className='grid grid-cols-2 w-full h-auto  shadow-lg '>
                                    <div className='grid grid-cols-2 w-full '>
                                        {values.post_id.images.map((val: string, index: number) => {
                                            return (<><div key={index} className='w-full h-40'>
                                                <img src={val} alt="" className='w-3/4 h-full ' />
                                            </div>
                                            </>)
                                        })}
                                    </div>
                                    <div className='space-y-3'>
                                            <button onClick={()=>handleDelete(values.post_id._id)} className='  bg-red-500 w-28 rounded-xl text-white h-12'>RemovePost</button>
                                        <div className='flex flex-row items-center'>
                                            <p className='font-medium'>Reported Users</p>
                                        </div>
                                        <div className='max-h-80 overflow-y-auto'>
                                            {values.user_datas.map((val: any, index: number) => (
                                                <div key={index} className='flex items-center space-x-4 py-2'>
                                                    <p className='w-6'>{index + 1}</p>
                                                    {val.user_id.img_url ? (
                                                        <img src={val.user_id.img_url} alt="" className='w-11 h-11 rounded-full' />
                                                    ) : (
                                                        <img src="/user06.png" alt="" className='w-11 h-11' />
                                                    )}
                                                    <p className='flex-1'>{val.user_id.firstname}</p>
                                                    <p className='flex-1'>{val.report_message}</p>
                                                    <p className='w-40'>{format(new Date(val.date), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>)
                    }) : <>
                    <div>
                    <p className="text-center text-black text-2xl">No reported posts available.</p>
                        </div></>

                    }
                </div>
                <Toaster
  position="top-center"
  reverseOrder={false}
/>
            </div>

        </>
    )
}

export default ReportedPost