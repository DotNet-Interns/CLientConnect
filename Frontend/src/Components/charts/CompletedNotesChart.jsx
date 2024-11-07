import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompletedNotesChart = ({ completedNotesThisMonth }) => {
  const data = {
    labels: ['Completed Notes for the Month'],
    datasets: [
      {
        label: 'Total Completed Notes',
        data: [completedNotesThisMonth], // Only one data point for the month
        backgroundColor: '#42A5F5',
        borderColor: '#1976D2',
        borderWidth: 1,
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
          label: (tooltipItem) => `Total: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Completed Notes',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CompletedNotesChart;
