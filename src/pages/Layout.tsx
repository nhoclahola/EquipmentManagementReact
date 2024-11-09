import React from 'react'
import NavigationBar from "../components/NavigationBar"
import { Route, Routes } from "react-router-dom"
import EquipmentPage from "./EquipmentPage"
import BorrowPage from "./BorrowPage"
import RoomPage from "./RoomPage"
import BorrowRoomPage from "./BorrowRoomPage"

const Layout = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="pt-16"></div>
      <Routes>
        <Route path="borrow" element={<BorrowPage />}></Route>
        <Route path="borrow-room" element={<BorrowRoomPage />}></Route>
        <Route path="equipments" element={<EquipmentPage />}></Route>
        <Route path="rooms" element={<RoomPage />}></Route>

      </Routes>
    </div>
  )
}

export default Layout