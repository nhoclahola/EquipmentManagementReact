import React, { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="fixed top-0 w-full bg-blue-600 text-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <span className="text-xl font-semibold">.</span> */}
            <img src="logo_hcmute.png" alt="HCMUTE Logo" className="h-10 w-8" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <button onClick={() => navigate("/borrow")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Mượn thiết bị</button>
            <button onClick={() => navigate("/borrow-room")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Mượn phòng</button>
            <button onClick={() => navigate("/equipments")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Thiết bị</button>
            <button onClick={() => navigate("/rooms")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Phòng</button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              title="Expand"
              onClick={handleMenuOpen}
              className="text-white hover:bg-blue-700 p-2 rounded-md"
            >
              <MenuIcon />
            </button>
          </div>

          {/* User Icon */}
          <button
            title="Profile"
            onClick={handleMenuOpen}
            className="ml-4 text-white hover:bg-blue-700 p-2 rounded-full"
          >
            <AccountCircleIcon />
          </button>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>About</MenuItem>
            <MenuItem onClick={handleMenuClose}>Services</MenuItem>
            <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default NavigationBar