import axios from "axios";
import React, { useCallback, useState } from 'react'
import { API_BASE_URL } from "../config/api";
import SearchBar from "../components/SearchBar";
import { CircularProgress } from "@mui/material";
import RoomTable from "../components/RoomTable";
import Pagination from "../components/Pagination";
import { isNullOrWhiteSpace } from "../utils/CheckString";

interface Room {
  roomId: number;
  roomName: string;
  borrowed: boolean;
}

const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  React.useEffect(() => {
    if (isSearch)
      search(query, currentPage);
    else
      onPageChange(currentPage);
  }, [currentPage, isSearch]);

  const onPageChange = useCallback((page: number) => {
    setLoading(true);
    axios.get(`/user/rooms?page=${page}`, {
      baseURL: API_BASE_URL,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((response) => {
      setRooms(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    })
  }, []);

  const search = useCallback((query: string, page: number) => {
    if (!isNullOrWhiteSpace(query)) {
      query = query.trim();
      setLoading(true);
      setIsSearch(true);
      setCurrentPage(page);
      axios.get(`/user/rooms/search?query=${query}&page=${page}`, {
        baseURL: API_BASE_URL,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        }
      }).then((response) => {
        setRooms(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      })
    }
  }, []);

  const cancelSearch = useCallback(() => {
    setIsSearch(false);
    setCurrentPage(1);
  }, []);
  
  return (
    <div className="space-y-8">
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        search={search}
        isSearch={isSearch}
        cancelSearch={cancelSearch} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <RoomTable data={rooms} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages} />
    </div>
  )
}

export default RoomPage