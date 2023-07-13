import React from "react";

const UserAuthorizationPage: React.FC = () => {
    return(
        <form action="/auth" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required/>
        </div>
        <div>
          <input type="submit" value="Log in"/>
        </div>
      </form>

    );
};

export default UserAuthorizationPage;