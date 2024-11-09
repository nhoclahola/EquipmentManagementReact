import React from 'react'

interface Room {
  roomId: number;
  roomName: string;
  borrowed: boolean;
}

interface RoomTableProps {
  data: Room[];
}

const RoomTable = ({ data }: RoomTableProps) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="w-[80%] bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-lg leading-normal"> {/* Đổi cỡ chữ ở đây */}
            <th className="py-3 px-6 text-left">ID phòng</th>
            <th className="py-3 px-6 text-left">Tên phòng</th>
            <th className="py-3 px-6 text-left">Tình trạng</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg font-light"> {/* Đổi cỡ chữ ở đây */}
          {data.map((item) => (
            <tr key={item.roomId} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.roomId}
              </td>
              <td className="py-3 px-6 text-left">
                {item.roomName}
              </td>
              <td className="py-3 px-6 text-left">
                {item.borrowed ? "Đang được mượn" : "Chưa được mượn"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoomTable