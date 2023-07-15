import React from "react";
import Input from "../components/layout/Input";

const UserRegistrationPage: React.FC = () =>{
    return(
        <form action="/register" method="POST">
        <Input htmlFor="name" text="Name:" type="text" id="name" name="name" accept="*/*"></Input>
        <Input htmlFor="email" text="Email:" type="email" id="email" name="email" accept="*/*"></Input>
        <Input htmlFor="password" text="Password:" type="password" id="password" name="password" accept="*/*"></Input>
        <Input htmlFor="confirm-password" text="Confirm Password:" type="password" id="confirm-password" name="confirm-password" accept="*/*"></Input>
        <div>
          <input type="submit" value="Register"/>
        </div>
      </form>
    );
};

export default UserRegistrationPage;