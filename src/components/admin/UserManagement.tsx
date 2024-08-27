import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import  { Toaster } from 'react-hot-toast'
import { getUsers } from '../../Api/adminApi';
import { User } from '../../Interface/UserInterface';
import 'flowbite';
import Table from './Table';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>([]);



    useEffect(() => {
        let Userdata = async () => {
            try {
                let response = await getUsers(0)
                let userData = response?.data.userDatas
                setUsers(userData)
            } catch (error) {
                console.error(error);

            }
        }
        Userdata()

    }, [])
    
    return (
        <>
            {/* <Nav/> */}
            <div className="flex flex-row">
                <Sidebar />
                { users&& users?.length>0?
                <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">
                    <Table role={"User"}/>
                 
                </div>
                :
                <p>Users Not Found</p>
                }
                <Toaster position="top-right" reverseOrder={false} />

            </div>

        </>
    );
};

export default UserManagement;
