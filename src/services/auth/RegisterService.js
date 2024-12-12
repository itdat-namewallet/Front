import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "회원가입 요청 실패");
    }
};
