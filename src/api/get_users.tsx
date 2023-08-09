import { useDispatch } from "react-redux";
import axiosInstance from "./api_instance";
import { Dispatch } from "@reduxjs/toolkit";
import { updateUsers } from "../reducers/usersReducer";



export const get_users = async (page: number, per_page: number) => {
    try {
        const response = await axiosInstance.get(`/users/all`, {
            params: {
                page: page,
                per_page: per_page,
            },
        });
        if (response.data.users) {
            const resp = {
                page: page,
                per_page: per_page,
                total: response.data.total,
                total_pages: response.data.total_pages,
                users: response.data.users
            };
            console.log(resp);

            return resp;


        } else {
            console.error("Invalid response data format:", response.data);
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }

};