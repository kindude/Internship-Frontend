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

interface Pagination {
  page: number;
  per_page: number;
  total:number;
  total_pages:number;

}

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    per_page: 10,
    total:0,
    total_pages:0
  });

  

  useEffect(() => {
    const fetchUsers = async () => {
      const response= await get_users(pagination.page, pagination.per_page);
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

  const handlePrevPage = async () => {
    if (pagination.page > 1) {
      const prevPage = pagination.page - 1;
      await get_users(prevPage, pagination.per_page);
    }
  };
  
  const handleNextPage = async () => {
    if (pagination.page < pagination.total_pages) {
      const nextPage = pagination.page + 1;
      await get_users(nextPage, pagination.per_page);
    }
  };

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      <ListUsers list={users}/>
      <div>
        <Button type="button" text="Previous" onClick={handlePrevPage} disabled={pagination.page === 1} />
        <Button type="button" text="Next" onClick={handleNextPage} disabled={pagination.page === pagination.total_pages} />
      </div>
    </div>
  );
};

export default UsersListPage;
