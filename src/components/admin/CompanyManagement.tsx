import React from 'react'
import SideBar from './SideBar'

const CompanyManagement = () => {
  return (
   <>
     <div className="flex flex-row">
        <SideBar />
        <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">
         
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg border-4 text-black">
            <tr>
                <th scope="col" className="px-6 py-9">
                    No.
                </th>
                <th scope="col" className="px-6 py-9">
                    CompanyDetails
                </th>
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Verification
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Block/Unblock
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr className=" text-black font-medium text-xl">
               
            <td className="px-6 py-6">
            1
                </td>
                <td className="px-6 py-6">
                    Dasarath
                </td>
                <td className="px-6 py-6 ">
                    <button className='h-14 w-20 text-white rounded-xl' style={{backgroundColor:'#48126A'}}>
                      Details
                    </button>
                </td>
                <td className="px-6 py-6">
                    Active
                </td>
                <td className="px-6 py-6">
                <button className='h-14 w-20 text-white rounded-xl bg-green-500' >
                      Verify
                    </button>        
                            </td>
                <td className="px-6 py-6">
                <button className='h-14 w-20 text-white rounded-xl bg-green-500' >
                      Block
                    </button>        
                            </td>
            </tr>
         
         
        </tbody>
    </table>
</div>

        </div>
      </div>
   </>
  )
}

export default CompanyManagement