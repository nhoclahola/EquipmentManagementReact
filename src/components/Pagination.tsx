import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ currentPage, totalPages, setCurrentPage, setTotalPages }: PaginationProps) => {

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <IconButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="text-gray-500 hover:text-blue-500"
      >
        <ArrowBackIosIcon />
      </IconButton>

      <span className="text-lg font-medium">
        {currentPage} / {totalPages}
      </span>

      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-gray-500 hover:text-blue-500"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}

export default Pagination