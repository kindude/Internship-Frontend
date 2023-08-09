import React from "react";
import { Link } from "react-router-dom";

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
    <ul>
      {list.map((item) => (
        <li key={item.id} className="user-item">
          <div>
            <Link to={`/userPage/${item.id}`}>{item.id}</Link>
          </div>
          <div className="username">Username: {item.username}</div>
          <div className="user-email">Email: {item.email}</div>
          <div>City: {item.city}</div>
          <div>Country: {item.country}</div>
          <div>Phone: {item.phone}</div>
          <div>Status: {item.status ? "Active" : "Inactive"}</div>
          <div>Roles: {item.roles.join(", ")}</div>
        </li>
      ))}
    </ul>
  );
};

export default ListUsers;
