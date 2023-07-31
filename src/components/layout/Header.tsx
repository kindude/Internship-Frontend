import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/types";



const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
  
    return (
      <div>
        {user.email && <p>Email: {user.email}</p>}
        {user.username && <p>Username: {user.username}</p>}
      </div>
    );
  };
  
  export default Header;