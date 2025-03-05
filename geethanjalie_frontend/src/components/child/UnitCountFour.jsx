import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hook/axiosInstance';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UnitCountFour = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);

    useEffect(() => {
        axiosInstance.get('/users/userCount')
            .then((res) => setTotalUsers(res.data?.userCount || 0))
            .catch((err) => console.error('Error fetching user count:', err));
    }, []);

    useEffect(() => {
        axiosInstance.get('/groups/groupCount')
            .then((res) => setTotalGroups(res.data?.length || 0))
            .catch((err) => console.error('Error fetching group count:', err));
    }, []);

    const dashboardCards = [
        {
            title: 'Total Students',
            count: totalUsers,
            icon: 'flowbite:users-group-solid',
            bgColor: 'bg-primary-600'
        },
        {
            title: 'Total Groups',
            count: totalGroups,
            icon: 'solar:wallet-bold',
            bgColor: 'bg-purple'
        }
    ];

    const chartData = {
        labels: ['Students', 'Groups'],
        datasets: [
            {
                label: 'Count',
                data: [totalUsers, totalGroups],
                backgroundColor: ['#4F46E5', '#9333EA'],
                borderRadius: 8,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Statistics Overview' }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-500">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    {/* Welcome Card */}
                    <div className="col-xxl-3 col-sm-6">
                        <div className="card px-4 py-3 shadow-lg rounded-3 border h-100 bg-gradient-start-4 text-center">
                            <div className="card-body">
                                <h6 className="fw-bold my-1 text-Black">Welcome! 👋 to your Dashboard</h6>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Stats Cards */}
                    {dashboardCards.map((card, index) => (
                        <div className="col-xxl-3 col-sm-6" key={index}>
                            <div className="card px-4 py-3 shadow-lg rounded-3 border h-400 bg-gradient-start-3">
                                <div className="card-body d-flex align-items-center gap-3">
                                    <div className="w-64-px h-64-px rounded-3 bg-base-50 d-flex justify-content-center align-items-center">
                                        <span className={`w-40-px h-40-px ${card.bgColor} text-white d-flex justify-content-center align-items-center rounded-2 fs-5`}>
                                            <Icon icon={card.icon} />
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-secondary-light fw-medium text-md fs-4">{card.title}</span>
                                        <h6 className="fw-bold my-1 fs-3">{card.count.toLocaleString()}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bar Graph */}
                    <div className="col-12 d-flex justify-content-center">
                        <div className="card p-4 shadow-lg rounded-3 border bg-light w-50 h-400">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitCountFour;
