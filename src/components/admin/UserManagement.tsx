import React from 'react';
import Sidebar from './SideBar';
import Nav from './Nav';

const UserManagement: React.FC = () => {
  return (
    <>
      {/* <Nav/> */}
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">
         
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg border-4 text-black">
            <tr>
                <th scope="col" className="px-6 py-9">
                    No.
                </th>
                <th scope="col" className="px-6 py-9">
                    UserDetails
                </th>
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
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
                    <button className='h-14 w-20 text-white rounded-xl' style={{backgroundColor:'#033431'}}>
                      Details
                    </button>
                </td>
                <td className="px-6 py-6">
                    Active
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
  );
};

export default UserManagement;
