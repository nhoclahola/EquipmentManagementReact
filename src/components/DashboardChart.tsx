import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DashboardChartProps {
  title: string;
  data: any;
}

const DashboardChart = ({ title, data }: DashboardChartProps) => {
  return (
    <div className="w-full max-w-md p-4 shadow-md bg-white rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      <Doughnut data={data} />
    </div>
  );
}

export default DashboardChart