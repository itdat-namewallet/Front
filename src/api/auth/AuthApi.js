import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://www.namewallet.store",
    headers: {
        "Content-Type": "application/json"
    }
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
            params: { type, value }
        });
        return response.data.available;
    } catch (error) {
        console.error(`API 호출 오류:`, error.response?.data || error.message);
        return false;
    }
};

