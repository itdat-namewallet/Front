import axios from "axios";

// Axios 인스턴스 설정
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false, // CORS 설정 시 필요함
});

// 공통 API 요청 함수
const handleApiCall = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "알 수 없는 오류가 발생했습니다.";
        console.error("API 요청 오류:", errorMessage);
        throw new Error(errorMessage);
    }
};

// 회원가입 API 호출
export const registerUser = async (userData) => {
    return handleApiCall(() => axiosInstance.post("/api/auth/register", userData));
};

// 유효성 검사 API 호출
export const checkAvailability = async (type, value) => {
    return handleApiCall(() =>
        axiosInstance.get(`/api/auth/check-availability`, {
            params: { type, value },
        })
    );
};

// 로그인 API 호출
export const loginUser = async (credentials) => {
    const data = await handleApiCall(() => axiosInstance.post("/api/auth/login", credentials));

    // JWT 토큰을 로컬 스토리지에 저장
    localStorage.setItem("jwtToken", data.token);
    // console.log("로그인 성공, 토큰 저장:", data.token);
    console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

    return data;
};

// Axios 인스턴스에 토큰 추가 함수
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};

// 소셜 로그인 요청
export const socialLogin = async (provider, data) => {
    return handleApiCall(() => axiosInstance.post(`/api/oauth/${provider}`, data));
};

// 소셜 로그인 연동 해제
export const unlinkSocialLogin = async (provider, data) => {
    return handleApiCall(() => axiosInstance.delete(`/api/oauth/${provider}`, { data }));
};
