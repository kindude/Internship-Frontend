import axiosInstance from "./api_instance";

export const get_companies = async (page: number, per_page: number) => {
    try {
        const response = await axiosInstance.get(`/companies/all`, {
            params: {
                page: page,
                per_page: per_page,
            },
        });
        if (response.data.companies) {
            const resp = {
                page: page,
                per_page: per_page,
                total: response.data.total,
                total_pages: response.data.total_pages,
                companies: response.data.companies,
            };
            return resp;
        } else {
            console.error("Invalid response data format:", response.data);
        }
    } catch (error) {
        console.error("Error fetching companies:", error);
    }
};
