import React, { useState } from "react";
import { TextField, Button, MenuItem, CircularProgress, Paper } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

interface BorrowFormData {
  roomId: number;
  equipmentId: number;
  quantity: number;
  returnDate: string;
}

interface UserBorrowStats {
  userId: number;
  borrowCount: number;
  overdueCount: number;
  lastBorrowDate: string;
}

const BorrowPage = () => {
  const [formData, setFormData] = useState<BorrowFormData>({
    roomId: 0,
    equipmentId: 0,
    quantity: 1,
    returnDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserBorrowStats>({
    userId: 1,
    borrowCount: 15,
    overdueCount: 2,
    lastBorrowDate: "2024-09-15",
  });

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

    try {
      await axios.post(`${API_BASE_URL}/borrow`, formData, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
      });
      alert("Phiếu mượn thiết bị đã được tạo thành công!");
    } catch (error: any) {
      setError("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
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
          fullWidth
          required
        />

        <TextField
          label="ID Thiết Bị"
          name="equipmentId"
          type="number"
          value={formData.equipmentId}
          onChange={handleChange}
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
            <span>{userStats.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tổng Số Phiếu Mượn:</span>
            <span>{userStats.borrowCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Số Phiếu Mượn Quá Hạn:</span>
            <span>{userStats.overdueCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Lần Mượn Gần Nhất:</span>
            <span>{userStats.lastBorrowDate}</span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Chức năng này hiện chưa được hỗ trợ")}
          >
            Xem Chi Tiết
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default BorrowPage