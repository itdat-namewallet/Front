import axios from "axios";

// Axios 인스턴스 설정
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false, // CORS 설정 시 필요함
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

// 로그인 API 호출
export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", credentials);
        const { token } = response.data;

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem("jwtToken", token);
        console.log("로그인 성공, 토큰 저장:", token);

        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error.response?.data || error.message);
        throw error;
    }
};

// Axios 인스턴스에 토큰 추가 함수
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};
