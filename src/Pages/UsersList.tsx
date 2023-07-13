import React from "react";


const UsersListPage: React.FC = () => {

    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
    ];

    return (
        <div>
            <h1>Users List</h1>
            <ul>
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