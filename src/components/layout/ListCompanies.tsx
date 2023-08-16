import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/UserResponse";
import { Company } from "../../types/CompanyResponse";
import "../../styles/ListCompanies.css";
import Button from "./Button";
import { leaveCompany } from "../../pages/UserPage";

interface ListUsersProps {
  list: Company[];
  user: User | undefined;
  showLink: boolean;
  showLeave: boolean;
}

const ListCompanies: React.FC<ListUsersProps> = ({ list, user, showLink, showLeave }) => {


  return (
    <ul className="company-list">
      {list.map((item) => (
        <li key={item.id} className="company-item">
          <div>
            {user?.id === item.owner_id && <span>✓ </span>}
            {showLink ? (
              <div>
                <Link to={`/companyPage/${item.id}`}>{item.name}</Link>
                <div className="company-details">
                  {item.name} {item.description}
                </div>
              </div>
            ) : (
              <div>
                <Button text={item.name} type="button" />
                {showLeave && <Button text="Leave" type="button" onClick={() => leaveCompany(item.id)}/>}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCompanies;
