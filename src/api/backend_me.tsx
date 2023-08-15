import { useDispatch } from "react-redux";
import axiosInstance from "../api/api_instance";
import { updateUser } from "../reducers/userReducer";


const callBackendApi = async (token: string) => {

    try {

  
      const response = await axiosInstance.post("/me");
      return response.data; 
    } catch (error) {
      console.error("Error during backend API call:", error);
      throw error;
    }
  };

export default callBackendApi;