// components/Header.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/types";
import { updateUser } from "../../reducers/userReducer";
import callBackendApi from "../../api/backend_me";
import {User} from "../../types/UserResponse"; // Make sure to import the User type

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const userRep = await callBackendApi();
          dispatch(updateUser(userRep));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="header-container">
      <div className="header-content">
        {user?.id && (
          <div className="user-info">
            <span className="user-icon">👤</span>
            <div className="user-details">
              <div className="username">{user.username}</div>
              <div className="email">Email: {user.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
