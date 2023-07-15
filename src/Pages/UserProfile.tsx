import React from "react";
import Input from "../components/layout/Input";

const UserProfilePage: React.FC = () => {

    return (
        <div>
            <Input htmlFor="name" text="Name:" type="text" id="name" name="name" accept="*/*"></Input>
            <Input htmlFor="email" text="Email:" type="email" id="email" name="email" accept="*/*"></Input>
            <Input htmlFor="photo" text="Photo:" type="file" id="photo" name="email" accept="image/*"></Input>
        </div>



    );
};

export default UserProfilePage;