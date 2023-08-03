import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/types";
import { updateEmail, updateUsername } from "../../reducers/slice";
import callBackendApi from "../../api/backend_me";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const userRep = await callBackendApi(token);
          dispatch(updateUsername(userRep.username || ""));
          dispatch(updateEmail(userRep.email || ""));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch]);



  return (
    <div>
      {user.email && <p>Email: {user.email}</p>}
      {user.username && <p>Username: {user.username}</p>}
    </div>
  );
};

export default Header;
