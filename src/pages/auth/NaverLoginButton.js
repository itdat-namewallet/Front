import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

export default function NaverLoginButton() {
    const navigate = useNavigate();

    const handleNaverLogin = () => {
        const state = Math.random().toString(36).substring(7); // 고유 state 값 생성
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            NAVER_REDIRECT_URI
        )}&state=${state}`;

        window.location.href = naverAuthUrl; // 네이버 로그인 페이지로 리디렉션
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        if (code && state) {
            handleNaverCallback(code, state);
        }
    }, []);

    const handleNaverCallback = async (code, state) => {
        console.log("Received code:", code);
        console.log("Received state:", state);

        try {
            const response = await axios.get(
                `http://localhost:8082/api/oauth/callback/naver?code=${code}&state=${state}`
            );

            const data = response.data;

            if (data.requiresRegistration) {
                console.log("Navigating to /register with state:", {
                    provider: "NAVER",
                    providerId: data.providerId,
                    email: data.email,
                    providerType: "NAVER",
                });

                // 회원가입 페이지로 이동
                navigate("/register", {
                    state: {
                        provider: "NAVER",
                        providerId: data.providerId,
                        email: data.email,
                        providerType: "NAVER",
                    },
                });
            } else {
                console.log("Login successful, redirecting to main page.");
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during Naver callback handling:", error.response?.data || error.message);
            alert("네이버 로그인 처리 중 문제가 발생했습니다.");
        }
    };

    return (
        <button onClick={handleNaverLogin}>네이버 계정으로 로그인</button>
    );
}
