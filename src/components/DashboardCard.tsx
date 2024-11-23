import React from 'react'

interface DashboardCardProps {
  title: string;
  value: number;
  bgColor: string;
  textColor?: string;
}

const DashboardCard = ({ title, value, bgColor, textColor = "text-white" }: DashboardCardProps) => {
  return (
    <div
      className={`rounded-lg p-4 shadow-md ${bgColor} ${textColor} flex flex-col items-center justify-center`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default DashboardCard