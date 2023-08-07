import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/UserResponse";

interface ListUserItem {
    id: number;
    name: string;
    description: string;
    site: string;
    city: string;
    country: string;
    is_visible: boolean;
    owner_id: number;
}

interface ListUsersProps {
    list: ListUserItem[];
    user: User | undefined;
}

const ListCompanies: React.FC<ListUsersProps> = ({ list, user }) => {
    return (
        <ul>
            {list.map((item) => (
                (user?.id === item.owner_id || item.is_visible) && (
                    <li key={item.id} className="company-item">
                        <div>
                            <Link to={`/companyPage/${item.id}`}>{item.id}</Link>
                        </div>
                        <div>
                            {item.name} {item.description}
                        </div>
                    </li>
                )
            ))}
        </ul>


    );
};

export default ListCompanies;
