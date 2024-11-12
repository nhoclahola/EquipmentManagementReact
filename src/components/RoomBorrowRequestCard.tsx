import React from 'react'
import { Card, CardContent, Chip, Typography } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { RoomBorrowRequest } from "./RoomBorrowRequestTable";

interface RoomBorrowRequestCardProps {
  request: RoomBorrowRequest;
}

const RoomBorrowRequestCard = ({ request }: RoomBorrowRequestCardProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card className="bg-white rounded-lg shadow-md p-4 mb-4">
      <CardContent className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant="h6" color="textPrimary">
            Mã phiếu mượn phòng: {request.id}
          </Typography>
        </div>

        <Typography variant="body1" color="textSecondary">
          <span className="font-semibold"></span> {request.user.fullName}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          <span className="font-semibold">ID phòng:</span> {request.room.roomId}
          <span className="font-semibold ml-4">Tên phòng:</span> {request.room.roomName}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          <span className="font-semibold">Ngày yêu cầu:</span> {request.requestDate.split("-").reverse().join("/")}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          <span className="font-semibold">Trạng thái:</span> {request.status === "APPROVED" ? "Đã được chấp nhận" : request.status === "PENDING" ? "Đang chờ xử lý" : "Đã bị từ chối"}
        </Typography>

        {
          request.status === "APPROVED" &&
          <div className="flex flex-col gap-y-4">
            <Chip
              icon={request.returned ? <CheckIcon /> : <CloseIcon />}
              label={request.returned ? 'Đã trả' : 'Chưa trả'}
              color={request.returned ? 'success' : 'warning'}
            />
            {
              request.borrowDate &&
              <Typography variant="body1" color="textSecondary">
                <span className="font-semibold mt-2">Ngày mượn:</span> {request.borrowDate.split("-").reverse().join("/")}
              </Typography>
            }
            {
              request.returnDate &&
              <Typography variant="body1" color="textSecondary">
                <span className="font-semibold mt-2">Ngày trả:</span> {request.returnDate.split("-").reverse().join("/")}
                {
                  !request.returned ? new Date(request.returnDate) < today
                    ? <span className="text-red-500"> (Quá hạn)</span>
                    : <span className="text-green-500"> (Chưa đến hạn)</span>
                  : <span className="text-green-500"> (Đã trả)</span>
                }
              </Typography>
            }
          </div>
        }
      </CardContent>
    </Card>
  )
}

export default RoomBorrowRequestCard