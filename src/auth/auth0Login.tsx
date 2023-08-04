import { useAuth0 } from "@auth0/auth0-react";
import callBackendApi from "../api/backend_me";
import { useDispatch } from "react-redux";
import { updateEmail, updateUsername } from "../reducers/slice";

const useAuth0Login = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      console.log('User is authenticated.');

      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://auth-reg`,
          },
        });
        console.log(user);
        if (accessToken) {
          console.log(accessToken);
          const userRep = await callBackendApi(accessToken);

          localStorage.setItem('accessToken', accessToken);

          dispatch(updateEmail(userRep.username || ""));
          dispatch(updateUsername(userRep.email || ""));
        } else {
          console.error('Access token is undefined or null.');
        }
      } else {
        console.log("No token returned");
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };

  return { handleLogin };
};

export default useAuth0Login;