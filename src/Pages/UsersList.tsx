import React from "react";
import '../styles/usersList.css';

const UsersListPage: React.FC = () => {

    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
    ];

    return (
        <div>
            <h1 className="page-title" >Users List</h1>
            <ul className="user-list" >
                {
                    users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))
                    }
            </ul>
        </div>
    );
};

export default UsersListPage;