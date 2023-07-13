import React from "react";


const CompanyProfilePage: React.FC = () => {
    return(
        <div>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" required />
            </div>

        </div> 

    );

};

export default CompanyProfilePage;