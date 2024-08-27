import { Toaster } from 'react-hot-toast';
import SideBar from './SideBar'

import Table from './Table'

const CompanyManagement = () => {

    return (
        <>
            <div className="flex flex-row">
                <SideBar />
                <div className="w-4/5 ml-8 border-black flex-col justify-center shadow-2xl p-6">
            <Table role={"Company"}/>
                </div>
                <Toaster position="top-right" reverseOrder={false} />

            </div>
        </>
    );
}

export default CompanyManagement