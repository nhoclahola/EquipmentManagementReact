import { Avatar, Box, Card, CardContent, CircularProgress, Divider, Typography } from "@mui/material";
import React, { useCallback, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import BorrowRequestTable, { BorrowRequest } from "../components/BorrowRequestTable";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import BorrowRequestCard from "../components/BorrowRequestCard";
import RoomBorrowRequestTable, { RoomBorrowRequest } from "../components/RoomBorrowRequestTable";
import RoomBorrowRequestCard from "../components/RoomBorrowRequestCard";

interface User {
  userId: number;
  fullName: string;
  gender: boolean; // true is male, false is female
  phoneNumber: string;
  role: string;
  username: string;
}

const UserProfile = () => {
  const auth = useSelector((store: RootState) => store.auth);
  const user = auth.user as User;
  // Chọn ảnh dựa trên giới tính
  const avatarImage = user.gender
    ? "/images/man.png"
    : "/images/woman.png";

  const [borrowRequests, setborrowRequests] = useState<BorrowRequest[]>([]);
  const [currentBorrowRequestPage, setCurrentBorrowRequestPage] = useState(1);
  const [totalBorrowRequestPages, setTotalBorrowRequestPages] = useState(1);
  const [loadingBorrowRequest, setLoadingBorrowRequest] = useState(false);
  const [errorBorrowRequest, setErrorBorrowRequest] = useState<any>(null);

  const [selectedBorrowRequest, setSelectedBorrowRequest] = useState<BorrowRequest | null>(null);

  React.useEffect(() => {
    onPageChangeBorrowRequest(currentBorrowRequestPage);
  }, [currentBorrowRequestPage]);

  const onPageChangeBorrowRequest = useCallback((page: number) => {
    setLoadingBorrowRequest(true);
    axios.get(`/user/borrow-request?page=${page}`, {
      baseURL: API_BASE_URL,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((response) => {
      setborrowRequests(response.data.content);
      setTotalBorrowRequestPages(response.data.totalPages);
      setLoadingBorrowRequest(false);
    }).catch((error) => {
      setErrorBorrowRequest(error);
      setLoadingBorrowRequest(false);
    })
  }, []);

  const handleBorrowRequestRowClick = (request: BorrowRequest) => {
    setSelectedBorrowRequest(request); // Cập nhật BorrowRequest được chọn
  };

  const [roomBorrowRequests, setRoomBorrowRequests] = useState<BorrowRequest[]>([]);
  const [currentRoomBorrowRequestPage, setCurrentRoomBorrowRequestPage] = useState(1);
  const [totalRoomBorrowRequestPages, setTotalRoomBorrowRequestPages] = useState(1);
  const [loadingRoomBorrowRequest, setLoadingRoomBorrowRequest] = useState(false);
  const [errorRoomBorrowRequest, setErrorRoomBorrowRequest] = useState<any>(null);

  const [selectedRoomBorrowRequest, setSelectedRoomBorrowRequest] = useState<RoomBorrowRequest | null>(null);

  React.useEffect(() => {
    onPageChangeRoomBorrowRequest(currentRoomBorrowRequestPage);
  }, [currentRoomBorrowRequestPage]);

  const onPageChangeRoomBorrowRequest = useCallback((page: number) => {
    setLoadingRoomBorrowRequest(true);
    axios.get(`/user/room-borrow-request?page=${page}`, {
      baseURL: API_BASE_URL,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((response) => {
      setRoomBorrowRequests(response.data.content);
      setTotalRoomBorrowRequestPages(response.data.totalPages);
      setLoadingRoomBorrowRequest(false);
    }).catch((error) => {
      setErrorRoomBorrowRequest(error);
      setLoadingRoomBorrowRequest(false);
    })
  }, []);

  const handleRoomBorrowRequestRowClick = (request: RoomBorrowRequest) => {
    setSelectedRoomBorrowRequest(request); // Cập nhật BorrowRequest được chọn
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-center mt-8">
        <Card sx={{ width: 400, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              alt={user.fullName}
              src={avatarImage}
              sx={{ width: 120, height: 120, marginTop: 2, marginBottom: 2, marginX: "auto" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
              {user.fullName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary", marginBottom: 2 }}>
              @{user.username}
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">ID người dùng:</span> {user.userId}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">Họ và tên:</span> {user.fullName}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">Username:</span> {user.username}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">Giới tính:</span> {user.gender ? "Nam" : "Nữ"}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">Số điện thoại:</span> {user.phoneNumber}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "500" }}>
                <span className="font-bold">Chức vụ:</span> {user.role == "USER" ? "Trợ giảng" : "Quản trị viên"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Requests */}
      <section className="flex gap-x-4">
        <div>
          <div className="flex justify-center font-bold text-lg text-cyan-700 font-mono">
            <h1>Tất cả phiếu đăng ký mượn thiết bị</h1>
          </div>
          <div className="space-y-2">
            {loadingBorrowRequest ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <BorrowRequestTable data={borrowRequests} onRowClick={handleBorrowRequestRowClick} currentRequest={selectedBorrowRequest} />
            )}
            <Pagination
              currentPage={currentBorrowRequestPage}
              totalPages={totalBorrowRequestPages}
              setCurrentPage={setCurrentBorrowRequestPage}
              setTotalPages={setTotalBorrowRequestPages} />
          </div>
        </div>

        <div className="w-[30%]">
          {selectedBorrowRequest && (
            <BorrowRequestCard request={selectedBorrowRequest} />
          )}
        </div>
      </section>

      {/* Room Requests */}
      <section className="flex gap-x-4">
        <div>
          <div className="flex justify-center font-bold text-lg text-cyan-700 font-mono">
            <h1>Tất cả phiếu đăng ký mượn phòng</h1>
          </div>
          <div className="space-y-2">
            {loadingBorrowRequest ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <RoomBorrowRequestTable data={roomBorrowRequests} onRowClick={handleRoomBorrowRequestRowClick} currentRequest={selectedRoomBorrowRequest} />
            )}
            <Pagination
              currentPage={currentRoomBorrowRequestPage}
              totalPages={totalRoomBorrowRequestPages}
              setCurrentPage={setCurrentRoomBorrowRequestPage}
              setTotalPages={setTotalRoomBorrowRequestPages} />
          </div>
        </div>

        <div className="w-[30%]">
          {selectedRoomBorrowRequest && (
            <RoomBorrowRequestCard request={selectedRoomBorrowRequest} />
          )}
        </div>
      </section>
    </div>
  );
}

export default UserProfile