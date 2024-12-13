import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,
});

// 회원가입 API 호출
export const registerUser = async (userData) => {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
};

// 유효성 검사 API 호출
export const checkAvailability = async (type, value) => {
    try {
        const response = await axiosInstance.get(`/api/auth/check-availability`, {
            params: { type, value },
        });
        console.log("API 응답 데이터:", response.data);
        return response.data.available;
    } catch (error) {
        console.error("API 요청 오류:", error);
        return false;
    }
};




