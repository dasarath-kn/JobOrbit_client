import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { dashboardData } from '../../Api/adminApi';
import { dashboard } from '../../Interface/AdminInterface';
import BarChart from './BarChart';

const Dashboard: React.FC = () => {
  const [dashboarddata, setDashboarddata] = useState<dashboard>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardData();
        if (response?.data) {
          setDashboarddata(response.data.dashboardData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Users', 'Companies', 'Subscribed Users'],
    datasets: [
      {
        label: 'Counts',
        data: [
          dashboarddata?.userCount || 0,
          dashboarddata?.companyCount || 0,
          dashboarddata?.subscribedUsersCount || 0,
        ],
        backgroundColor: 'rgba(93, 242, 39, 0.45)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='flex flex-row'>
      <SideBar />
      <div className='w-2/3 grid grid-cols-3 gap-x-4 m-9'>
        <div className='col-span-3'>
        </div>
        <div className='border-2 h-40 flex justify-center bg-orange-100 rounded-3xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Users</p>
            <p className='text-black text-xl font-medium text-center'>{dashboarddata?.userCount}</p>
          </div>
        </div>
        <div className='border-2 h-40 flex justify-center bg-orange-100 rounded-3xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Companies</p>
            <p className='text-black text-xl font-medium text-center'>{dashboarddata?.companyCount}</p>
          </div>
        </div>
        <div className='border-2 h-40 flex justify-center bg-orange-100 rounded-3xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Subscribed Users</p>
            <p className='text-black text-xl font-medium text-center'>{dashboarddata?.subscribedUsersCount}</p>
          </div>
        </div>

        <div className='col-span-3 w-2/3 mx-auto'> {/* Adjust width and centering */}
          <BarChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
