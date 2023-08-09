import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../types/types";
import "../../styles/ListUsers.css";

interface ListUserItem {
  id: number;
  username: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  status: boolean;
  roles: string[];
}

interface ListUsersProps {
  list: ListUserItem[];
}

const ListUsers: React.FC<ListUsersProps> = ({ list }) => {
  return (
    <ul className="user-list">
      {list.map((item) => (
        <li key={item.id} className="user-item">
          <div className="user-info">
            <Link to={`/userPage/${item.id}`} className="user-id">
              {item.id}
            </Link>
            <div className="user-details">
              <div className="detail">Username: {item.username}</div>
              <div className="detail">Email: {item.email}</div>
              <div className="detail">City: {item.city}</div>
              <div className="detail">Country: {item.country}</div>
              <div className="detail">Phone: {item.phone}</div>
              <div className={`status ${item.status ? "active" : "inactive"}`}>
                {item.status ? "Active" : "Inactive"}
              </div>
              <div className="detail">Roles: {item.roles.join(", ")}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListUsers;