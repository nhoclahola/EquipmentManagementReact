import React from 'react'

interface User {
  userId: number;
  fullName: string;
  gender: boolean; // true is male, false is female
  phoneNumber: string;
  role: string;
  username: string;
}

interface Room {
  roomId: number;
  roomName: string;
}

export interface RoomBorrowRequest {
  id: number;
  user: User;
  room: Room;
  requestDate: string;
  borrowDate: string | null;
  returnDate: string | null;
  status: string;
  returned: boolean;
}

interface RoomBorrowRequestTableProps {
  data: RoomBorrowRequest[];
  onRowClick: (request: RoomBorrowRequest) => void;
  currentRequest: RoomBorrowRequest | null;
}

const RoomBorrowRequestTable = ({ data, onRowClick, currentRequest }: RoomBorrowRequestTableProps) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="w-[80%] bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-lg leading-normal"> {/* Đổi cỡ chữ ở đây */}
            <th className="py-3 px-6 text-left">Mã phiếu</th>
            <th className="py-3 px-6 text-left">Ngày yêu cầu</th>
            <th className="py-3 px-6 text-left">Ngày mượn</th>
            <th className="py-3 px-6 text-left">Ngày trả</th>
            <th className="py-3 px-6 text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg font-light"> {/* Đổi cỡ chữ ở đây */}
          {data.map((item) => (
            <tr
              key={item.id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${currentRequest?.id === item.id && "bg-gray-100"} cursor-pointer`}
              onClick={() => onRowClick(item)}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.id}
              </td>
              <td className="py-3 px-6 text-left">
                {item.requestDate.split("-").reverse().join("/")}
              </td>
              <td className="py-3 px-6 text-left">
                {item.borrowDate?.split("-").reverse().join("/")}
              </td>
              <td className="py-3 px-6 text-left">
                {item.returnDate?.split("-").reverse().join("/")}
              </td>
              <td className="py-3 px-6 text-left">
                {item.status === "APPROVED" ? "Đã được chấp nhận" : item.status === "PENDING" ? "Đang chờ xử lý" : "Đã bị từ chối"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoomBorrowRequestTable