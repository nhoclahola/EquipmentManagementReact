import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
    ? "/images/man.png" // Thay bằng đường dẫn tới ảnh đại diện nam
    : "/images/woman.png"; // Thay bằng đường dẫn tới ảnh đại diện nữ

  return (
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
              <span className="font-bold">Chức vụ:</span> {user.role == "USER" ? "Người dùng" : "Quản trị viên"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile