import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://www.namewallet.store",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const registerUser = async (userData) => {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
};
