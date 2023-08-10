import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/UserResponse";
import { Company } from "../../types/CompanyResponse";
import "../../styles/ListCompanies.css";

interface ListUsersProps {
    list: Company[];
    user: User | undefined;
}

const ListCompanies: React.FC<ListUsersProps> = ({ list, user }) => {
    return (
        <ul className="company-list">
            {list.map((item) => (

                    <li key={item.id} className="company-item">
                        <div>
                            {user?.id === item.owner_id && (
                                <span>✓ </span>
                            )}
                            <Link to={`/companyPage/${item.id}`}>{item.id}</Link>
                        </div>

                        <div className="company-details">
                            {item.name} {item.description}
                        </div>
                    </li>
            ))}
        </ul>
    );
};

export default ListCompanies;
