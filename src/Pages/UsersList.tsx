import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api_instance";
import { Link } from "react-router-dom";
import {User} from "../types/UserResponse";
import Button from "../components/layout/Button";
import { UserState, updateUsers } from "../reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import  "../styles/usersList.css";
import ListUsers from "../components/layout/ListUsers";
import { get_users } from "../api/get_users";
import { RootState } from "../types/types";
import Pagination from "../components/layout/Pagination";

interface Pagination {
  page: number;
  per_page: number;
  total:number;
  total_pages:number;

}

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    per_page: 10,
    total:0,
    total_pages:0
  });

  

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await get_users(pagination.page, pagination.per_page);
      setUsers(response?.users);
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: response?.page ?? prevPagination.page,
        per_page: response?.per_page ?? prevPagination.per_page,
        total: response?.total ?? prevPagination.total,
        total_pages: response?.total_pages ?? prevPagination.total_pages,
      }));
     
    };

    fetchUsers();
  }, [pagination.page, pagination.per_page]);


  const handlePageChange = (pageNumber: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: pageNumber,
    }));
  };

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      <ListUsers list={users} show={true} companyId={0}/>
      <Pagination
        totalPages={pagination.total_pages}
        currentPage={pagination.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersListPage;
