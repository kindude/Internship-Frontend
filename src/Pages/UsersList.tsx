import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api_instance";
import { Link } from "react-router-dom";
import {User} from "../types/UserResponse";
import Button from "../components/layout/Button";
import { updateUsers } from "../reducers/usersReducer";
import { useDispatch } from "react-redux";
import  "../styles/usersList.css";


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

  const get_users = async (page: number, per_page: number) => {
    try {
      const response = await axiosInstance.get(`/users/all`, {
        params: {
          page: page,
          per_page: per_page,
        },
      });
      if (response.data.users) {
        setUsers(response.data.users);
        setPagination((prevPagination) => ({
          ...prevPagination,
          page: page,
          per_page: per_page,
          total: response.data.total, // Assuming you have 'total' in the response data
          total_pages: response.data.total_pages, // Assuming you have 'total_pages' in the response data
        }));

        dispatch(updateUsers(response.data.users))

      } else {
        console.error("Invalid response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      get_users(pagination.page, pagination.per_page);
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
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div>
              <Link to={`/userPage/${user.id}`}>{user.id}</Link>
            </div>
            <div className="username" >Username: {user.username}</div>
            <div className="user-email">Email: {user.email}</div>
            <div>City: {user.city}</div>
            <div>Country: {user.country}</div>
            <div>Phone: {user.phone}</div>
            <div>Status: {user.status ? "Active" : "Inactive"}</div>
            <div>Roles: {user.roles.join(", ")}</div>
          </li>
        ))}
      </ul>

      <div>
        <Button type="button" text="Previous" onClick={handlePrevPage} disabled={pagination.page === 1} />
        <Button type="button" text="Next" onClick={handleNextPage} disabled={pagination.page === pagination.total_pages} />
      </div>
    </div>
  );
};

export default UsersListPage;
