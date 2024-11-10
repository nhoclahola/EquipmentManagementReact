import { Box, Card, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Login from './Login'
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Authentication = () => {
  const auth = useSelector((store: RootState) => store.auth);
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('ute_background.jpg')" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        className={isMdOrSmaller ? "bg-custom-image" : ""}
      >
        <Card className="p-8 max-w-md w-full">
          <div className="flex flex-col mb-5 space-y-1">
            <Typography
              variant="h4"
              align="center"
              fontFamily="Lobster"
              style={{
                color: "#1a73e8",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              HCMUTE
            </Typography>
            <Typography
              align="center"
              fontFamily="Poppins"
              style={{
                fontSize: "1.1rem",
                color: "#555",
                marginTop: "0.5rem",
              }}
            >
              Hệ thống mượn thiết bị và phòng học
            </Typography>
          </div>
          <Login />
        </Card>
      </Box>
    </Box>
  );
};

export default Authentication;