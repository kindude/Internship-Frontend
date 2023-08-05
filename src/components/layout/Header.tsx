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
          const userRep = await callBackendApi(token);
          dispatch(updateUser(userRep));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {user?.id && <p>Email: {user.email}</p>}
      {user?.username && <p>Username: {user.username}</p>}
    </div>
  );
};

export default Header;
