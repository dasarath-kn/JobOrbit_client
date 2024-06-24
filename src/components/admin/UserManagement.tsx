import React from 'react';
import Navbar from './Navbar';

const UserManagement = () => {
  return (
    <div className="flex flex-col bg-black">
      <div className="bg-red-500 flex flex-col">
        <div className="w-4/5">
          <Navbar />
        </div>
        <div className="bg-black w-1/2 mt-4">
          <ul className="text-white flex justify-evenly">
            <li>No.</li>
            <li>Userdetails</li>
            <li>Status</li>
            <li>Block/Unblock</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
