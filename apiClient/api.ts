import axios, { AxiosInstance } from "axios";

export const apiCall = async (method: string, url: string, body?: {}) => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: "https://demoapi.remis.africa/",
    headers: { "Content-Type": "application/json" },
  });

  apiClient.interceptors.request.use(
    (config) => {
      // let token = localStorage.getItem("userPayload")  ? JSON.parse(localStorage.getItem("userPayload")) : ""
      let token = "";
      const userObject = localStorage.getItem("userPayload");
      if (userObject !== null) {
        const parsedUser = JSON.parse(userObject);
        token = parsedUser?.token;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error: any) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
  
  if (method == "post") {
    return apiClient.post(url, body);
  }
  if (method == "get") {
    return apiClient.get(url);
  }
  if(method == "put"){
    return apiClient.put(url , body)
  }
};
