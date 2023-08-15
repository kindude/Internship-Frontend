import axiosInstance from "../api_instance";

export const cancelRequest_user = async (request_id:number, company_id:number, user_id:number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const requestData = {
        id: request_id,
        user_id: user_id, 
        company_id: company_id, 
        status: "PENDING",
        type_of_action: "REQUEST"
      };

      const response = await axiosInstance.post(`/action/request/cancel`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };


