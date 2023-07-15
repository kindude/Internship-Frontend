import React from "react";
import Input from "../components/layout/Input";

const UserAuthorizationPage: React.FC = () => {
    return(
        <form action="/auth" method="POST">

        <Input htmlFor="email" text="Email:" type="email" id="email" name="email" accept="*/*"></Input>

        <Input htmlFor="password" text="Password:" type="password" id="password" name="password" accept="*/*"></Input>

        <div>
          <input type="submit" value="Log in"/>
        </div>
      </form>

    );
};

export default UserAuthorizationPage;