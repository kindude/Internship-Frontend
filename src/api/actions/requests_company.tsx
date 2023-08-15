import axiosInstance from "../api_instance";

export const acceptRequest_company = async(request_id:number, company_id:number, user_id:number) => {
    try {
        const token = localStorage.getItem('accessToken');
        const requestData = {
          id: request_id,
          user_id: user_id, 
          company_id: company_id, 
          status: "PENDING",
          type_of_action: "REQUEST"
        };

        const response = await axiosInstance.post(`/companies/${company_id}/request/accept`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
};


export const rejectRequest_company = async(request_id:number, company_id:number, user_id:number) => {
    try {
        const token = localStorage.getItem('accessToken');
        const requestData = {
          id: request_id,
          user_id: user_id, 
          company_id: company_id, 
          status: "PENDING",
          type_of_action: "REQUEST"
        };
  
        const response = await axiosInstance.post(`/companies/${company_id}/request/accept`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
};