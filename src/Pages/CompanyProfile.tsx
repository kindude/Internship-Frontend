import React from "react";
import Input from "../components/layout/Input";

const CompanyProfilePage: React.FC = () => {
    return(
        <div>
            <Input htmlFor="name" text="Name:" type="text" id="name" name="name" accept="*/*"></Input>
            <Input htmlFor="location" text="Location:" type="text" id="location" name="location" accept="*/*"></Input>


        </div> 

    );

};

export default CompanyProfilePage;