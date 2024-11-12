import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, CircularProgress, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

interface BorrowFormData {
  roomId: number;
  equipmentId: number;
  quantity: number;
  returnDate: string;
}

interface UserBorrowStats {
  userId: number;
  totalBorrowRequest: number;
  overdueBorrowRequest: number;
  recentBorrow: string;
}

const BorrowPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BorrowFormData>({
    roomId: 0,
    equipmentId: 0,
    quantity: 1,
    returnDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const [userStats, setUserStats] = useState<UserBorrowStats>();

  useEffect(() => {
    fetchUserStats();
  }, [])

  const fetchUserStats = () => {
    axios.get(`${API_BASE_URL}/user/borrow-request/me`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
    }).then((response) => {
      setUserStats(response.data);
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" || name === "roomId" || name === "equipmentId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    axios.post(`${API_BASE_URL}/user/borrow-request`, formData, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
    }).then((response) => {
      setSuccessDialogOpen(true);
      setUserStats((prevStats) =>
        prevStats ? { ...prevStats, totalBorrowRequest: prevStats.totalBorrowRequest + 1 } : prevStats
      );
    }).catch((error) => {
      setError(error?.response?.data);
      setErrorDialogOpen(true);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 p-8 space-x-8">
      {/* Form tạo phiếu mượn */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Tạo Phiếu Mượn Thiết Bị</h2>

        <TextField
          label="ID Phòng"
          name="roomId"
          type="number"
          value={formData.roomId}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          fullWidth
          required
        />

        <TextField
          label="ID Thiết Bị"
          name="equipmentId"
          type="number"
          value={formData.equipmentId}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          fullWidth
          required
        />

        <TextField
          label="Số Lượng"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          fullWidth
          required
        />

        <TextField
          label="Ngày Trả"
          name="returnDate"
          type="date"
          value={formData.returnDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
          }}
          fullWidth
          required
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Tạo Phiếu Mượn"}
          </Button>
        </div>
      </form>

      {/* Thống kê số lượng phiếu mượn của người dùng */}
      <Paper className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Thống Kê Phiếu Mượn Của Người Dùng</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">ID Người Dùng:</span>
            <span>{userStats?.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tổng Số Phiếu Mượn:</span>
            <span>{userStats?.totalBorrowRequest}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Số Phiếu Mượn Quá Hạn:</span>
            <span>{userStats?.overdueBorrowRequest}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Lần Mượn Thành công Gần Nhất:</span>
            <span>{userStats?.recentBorrow ? userStats?.recentBorrow.split("-").reverse().join("/") : "Không có"}</span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/profile")}
          >
            Xem Chi Tiết
          </Button>
        </div>
      </Paper>

      {/* Modal Success */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Thành Công</DialogTitle>
        <DialogContent>Phiếu mượn thiết bị đã được tạo thành công!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Error */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Lỗi</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BorrowPage