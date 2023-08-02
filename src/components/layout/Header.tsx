import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/types";
import { updateEmail, updateUsername } from "../../reducers/slice";
import callBackendApi from "../../api/backend_me";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      dispatch(updateUsername(userObj.username || ""));
      dispatch(updateEmail(userObj.email || ""));
    }
  }, [dispatch]);



  return (
    <div>
      {user.email && <p>Email: {user.email}</p>}
      {user.username && <p>Username: {user.username}</p>}
    </div>
  );
};

export default Header;
