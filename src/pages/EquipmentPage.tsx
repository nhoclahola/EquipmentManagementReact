import axios from "axios";
import React, { useCallback, useState } from 'react'
import { API_BASE_URL } from "../config/api";
import EquipmentTable from "../components/EquipmentTable";
import { CircularProgress, IconButton, TextField, styled } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { isNullOrWhiteSpace } from "../utils/CheckString";

interface Room {
  roomId: number;
  roomName: string;
}

interface Equipment {
  equipmentId: string;
  equipmentName: string;
  brandName: string;
  description: string;
  imageUrl: string | null;
}

interface RoomEquipment {
  id: number;
  room: Room;
  equipment: Equipment;
  quantity: number;
  remainQuantity: number;
}

const EquipmentPage = () => {
  const [roomEquipments, setRoomEquipments] = useState<RoomEquipment[]>([]);
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
    axios.get(`/user/equipments?page=${page}`, {
      baseURL: API_BASE_URL,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((response) => {
      setRoomEquipments(response.data.content);
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
      axios.get(`/user/equipments/search?query=${query}&page=${page}`, {
        baseURL: API_BASE_URL,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        }
      }).then((response) => {
        setRoomEquipments(response.data.content);
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
        <EquipmentTable data={roomEquipments} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages} />
    </div>
  )
}

export default EquipmentPage