import axiosInstance from "../api_instance";

export const acceptInvite_user = async(request_id:number, company_id:number, user_id:number) => {
    try {
        const token = localStorage.getItem('accessToken');
        const requestData = {
          id: request_id,
          user_id: user_id, 
          company_id: company_id, 
          status: "PENDING",
          type_of_action: "INVITE"
        };
  
        const response = await axiosInstance.post(`/action/invite/accept`, requestData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
};


export const rejectInvite_user = async(request_id:number, company_id:number, user_id:number) => {
    try {
        const token = localStorage.getItem('accessToken');
        const requestData = {
          id: request_id,
          user_id: user_id, 
          company_id: company_id, 
          status: "PENDING",
          type_of_action: "INVITE"
        };
  
        const response = await axiosInstance.post(`/action/invite/reject`, requestData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
};