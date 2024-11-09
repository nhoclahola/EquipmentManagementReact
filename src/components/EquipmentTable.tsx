import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import React from 'react'
import { API_BASE_URL } from "../config/api";

interface Room {
  roomId: number;
  roomName: string;
}

interface Equipment {
  equipmentId: string;
  equipmentName: string;
  imageUrl: string | null;
}

interface RoomEquipment {
  id: number;
  room: Room;
  equipment: Equipment;
  quantity: number;
  remainQuantity: number;
}

interface RoomEquipmentTableProps {
  data: RoomEquipment[];
}

const EquipmentTable = ({ data }: RoomEquipmentTableProps) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="w-[80%] bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-lg leading-normal"> {/* Đổi cỡ chữ ở đây */}
            <th className="py-3 px-6 text-left">ID Thiết bị</th>
            <th className="py-3 px-6 text-left">Tên Thiết bị</th>
            <th className="py-3 px-6 text-left">Tên phòng</th>
            <th className="py-3 px-6 text-left">Số lượng</th>
            <th className="py-3 px-6 text-left">Hình ảnh</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg font-light"> {/* Đổi cỡ chữ ở đây */}
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.equipment.equipmentId}
              </td>
              <td className="py-3 px-6 text-left">
                {item.equipment.equipmentName}
              </td>
              <td className="py-3 px-6 text-left">
                {item.room.roomName}
              </td>
              <td className="py-3 px-6 text-left">
                {item.quantity}
              </td>
              <td className="py-3 px-6 text-left">
                {/* Hiển thị hình ảnh nếu có */}
                {item.equipment.imageUrl ? (
                  <img
                    src={`${API_BASE_URL}/${item.equipment.imageUrl}`}
                    alt={item.equipment.equipmentName}
                    className="w-32 h-32 object-cover rounded" 
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EquipmentTable