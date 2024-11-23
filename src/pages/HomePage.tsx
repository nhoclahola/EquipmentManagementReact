import React, { useEffect, useState } from 'react';
import DashboardCard from "../components/DashboardCard";
import DashboardChart from "../components/DashboardChart";
import { API_BASE_URL } from "../config/api";
import axios from "axios";

export const dashboardData = {
  chartData: {
    labels: ["Phòng đang được mượn", "Phòng trống"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4CAF50", "#FF5722"],
      },
    ],
  },
  equipmentsChartData: {
    labels: ["Thiết bị đang mượn", "Thiết bị có sẵn"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#FF9800", "#03A9F4"],
      },
    ],
  },
};

const HomePage = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [borrowedRooms, setBorrowedRooms] = useState(0);
  const [totalEquipments, setTotalEquipments] = useState(0);
  const [borrowedEquipments, setBorrowedEquipments] = useState(0);

  const [roomChartData, setRoomChartData] = useState(dashboardData.chartData);
  const [deviceChartData, setDeviceChartData] = useState(dashboardData.equipmentsChartData);
  const [autoRefresh, setAutoRefresh] = useState(true); // Trạng thái toggle auto-refresh

  const fetchData = async () => {
    try {
      const [roomCount, borrowedRoomCount, equipmentCount, borrowedEquipmentCount] = await Promise.all([
        axios.get(`${API_BASE_URL}/user/rooms/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }),
        axios.get(`${API_BASE_URL}/user/room-borrow-request/borrowed/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }),
        axios.get(`${API_BASE_URL}/user/equipments/all-rooms-count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }),
        axios.get(`${API_BASE_URL}/user/borrow-request/borrowed/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }),
      ]);

      // Cập nhật dữ liệu
      setRoomChartData({
        labels: ["Phòng đang được mượn", "Phòng trống"],
        datasets: [
          {
            data: [borrowedRoomCount.data, roomCount.data - borrowedRoomCount.data],
            backgroundColor: ["#4CAF50", "#FF5722"],
          },
        ],
      });

      setDeviceChartData({
        labels: ["Thiết bị đang mượn", "Thiết bị có sẵn"],
        datasets: [
          {
            data: [borrowedEquipmentCount.data, equipmentCount.data - borrowedEquipmentCount.data],
            backgroundColor: ["#FF9800", "#03A9F4"],
          },
        ],
      });

      setTotalRooms(roomCount.data);
      setBorrowedRooms(borrowedRoomCount.data);
      setTotalEquipments(equipmentCount.data);
      setBorrowedEquipments(borrowedEquipmentCount.data);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  // Gọi API lần đầu khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh nếu toggle được bật
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Cập nhật mỗi 10 giây

    return () => clearInterval(interval); // Xóa interval khi unmount hoặc khi autoRefresh tắt
  }, [autoRefresh]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg">Auto-refresh</span>
          <button
            title="Refresh mỗi 10 giây"
            className={`w-12 h-6 rounded-full flex items-center px-1 ${autoRefresh ? "bg-green-500" : "bg-gray-300"
              }`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform ${autoRefresh ? "translate-x-6" : ""
                }`}
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Tổng số phòng" value={totalRooms} bgColor="bg-blue-500" />
        <DashboardCard title="Phòng đang mượn" value={borrowedRooms} bgColor="bg-yellow-500" />
        <DashboardCard title="Phòng trống" value={totalRooms - borrowedRooms} bgColor="bg-purple-500" />
        <DashboardCard title="Tổng số thiết bị" value={totalEquipments} bgColor="bg-green-500" />
        <DashboardCard title="Thiết bị đang mượn" value={borrowedEquipments} bgColor="bg-red-500" />
        <DashboardCard title="Số thiết bị khả dụng" value={totalEquipments - borrowedEquipments} bgColor="bg-orange-500" />
      </div>
      <div className="flex justify-center gap-x-20 mt-20">
        <DashboardChart title="Tổng số phòng" data={roomChartData} />
        <DashboardChart title="Tổng số thiết bị" data={deviceChartData} />
      </div>
    </div>
  );
};

export default HomePage;
