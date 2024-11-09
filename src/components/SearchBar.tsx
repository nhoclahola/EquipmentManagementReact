import React, { useState } from 'react'
import { IconButton, TextField, Tooltip, styled } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';

const AnimatedSearchBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  backgroundColor: '#ffffff',
  borderRadius: '9999px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  width: '400px',
  '&:focus-within': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
  },
  '&:hover': {
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
  },
});

const SearchButton = styled(IconButton)({
  backgroundColor: '#6200EE',
  color: '#ffffff',
  borderRadius: '50%',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#3700B3',
  },
  transition: 'background-color 0.2s',
});

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  search: (query: string, page: number) => void;
  cancelSearch: () => void;
  isSearch: boolean;
}

const SearchBar = ({ query, setQuery, search, isSearch, cancelSearch }: SearchBarProps) => {

  return (
    <div className="flex justify-center items-center mt-4">
      <AnimatedSearchBar className="space-x-4">
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              paddingRight: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />
        {
          isSearch ? 
          <Tooltip title="Huỷ tìm kiếm">
            <SearchButton onClick={() => cancelSearch()}>

                <CancelIcon />
            </SearchButton>
          </Tooltip>
          :
          <Tooltip title="Tìm kiếm">
            <SearchButton onClick={() => search(query, 1)}>
                <SearchIcon />
            </SearchButton>
          </Tooltip>
        }
      </AnimatedSearchBar>
    </div>
  )
}

export default SearchBar