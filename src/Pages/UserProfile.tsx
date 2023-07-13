import React from "react";


const UserProfilePage: React.FC = () => {

    return (
        <div>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="photo">Photo:</label>
                <input type="file" id="photo" accept="image/*" />
            </div>
        </div>



    );
};

export default UserProfilePage;