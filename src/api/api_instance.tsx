import axios, { AxiosInstance } from 'axios';
import React, { useState, useEffect } from "react";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },

});

export const fetchData = (endpoint: string) => {
  return axiosInstance.get(endpoint)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching data:", error);
      throw error;
    });
};


export const checkBackendHealth = () => {
  return axiosInstance.get('/api/health')
    .then(() => {
      console.log("Backend is healthy");
      return true;
    })
    .catch(() => {
      console.log("Backend is not responding");
      return false;
    });
};

export default axiosInstance;


