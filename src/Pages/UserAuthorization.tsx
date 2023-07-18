import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";

const UserAuthorizationPage: React.FC = () => {
    return(
        <form action="/auth" method="POST">

        <Input htmlFor="email" text="Email:" type="email" id="email" name="email" accept="*/*"></Input>

        <Input htmlFor="password" text="Password:" type="password" id="password" name="password" accept="*/*"></Input>


        <Button value="Log in"></Button>
      </form>

    );
};

export default UserAuthorizationPage;