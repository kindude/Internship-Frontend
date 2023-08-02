import axiosInstance from "../api/api_instance";

const callBackendApi = async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axiosInstance.post("/me", {}, config);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data; 
    } catch (error) {
      console.error("Error during backend API call:", error);
      throw error;
    }
  };

export default callBackendApi;