import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { dashboardData } from '../../Api/adminApi';
import { dashboard } from '../../Interface/AdminInterface';
import BarChart from './BarChart';
import PieChart from './PieChart';

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

  const pieChartData = {
    labels: ['Users', 'Companies', 'Subscribed Users'],
    datasets: [
      {
        data: [
          dashboarddata?.userCount || 0,
          dashboarddata?.companyCount || 0,
          dashboarddata?.subscribedUsersCount || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className='flex flex-col min-h-screen lg:flex-row'>
      <SideBar />
      <div className='md:w-2/3 sm:w-1/2 lg:mt-14 lg:w-2/3 justify-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 m-4'>
      

        <div className='border-2 h-36 rounded-xl flex justify-center shadow-2xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Users</p>
            <p className='text-black text-xl font-medium text-center'>
              {dashboarddata?.userCount}
            </p>
          </div>
        </div>

        <div className='border-2 h-36 rounded-xl flex justify-center shadow-2xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Companies</p>
            <p className='text-black text-xl font-medium text-center'>
              {dashboarddata?.companyCount}
            </p>
          </div>
        </div>

        <div className='border-2 h-36 rounded-xl flex justify-center shadow-2xl items-center'>
          <div className='space-y-6'>
            <p className='text-black text-2xl font-semibold'>Subscribed Users</p>
            <p className='text-black text-xl font-medium text-center'>
              {dashboarddata?.subscribedUsersCount}
            </p>
          </div>
        </div>

        <div className='lg:col-span-3 w-full'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='w-full lg:w-1/2 h-80'>
              <BarChart data={chartData} options={chartOptions} />
            </div>
            <div className='w-full lg:w-1/2 h-80'>
              <PieChart data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
