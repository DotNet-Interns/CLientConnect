import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const UserPieChart = ({ activeUsers, inactiveUsers }) => {
  const data = {
    labels: ['Active Customers', 'Inactive Customers'],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#4D9DE0', '#A6CFE2'], // Darker blue for active, lighter blue for inactive
        hoverBackgroundColor: ['#1F77B4', '#82B1C2'], // Slightly darker shades on hover
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Pie className=' ' data={data} options={options} />;
};

export default UserPieChart;
