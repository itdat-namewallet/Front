import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import naverImage from "../../assets/images/naver_icon.png";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function NaverLoginButton() {
    const navigate = useNavigate();

    // URL에서 토큰 처리
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            console.log("네이버 로그인: URL에서 추출한 토큰:", token);
            localStorage.setItem("jwtToken", token);
            navigate("/", { replace: true });
        }
    }, [navigate]);

    // 네이버 로그인 요청
    const handleNaverLogin = () => {
        const state = Math.random().toString(36).substring(7);
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            NAVER_REDIRECT_URI
        )}&state=${state}`;

        window.location.href = naverAuthUrl; // 네이버 로그인 페이지로 리디렉션
    };

    // 회원가입 여부 확인 (추가 처리)
    const handleNaverCallback = async (code, state) => {
        console.log("Received code:", code);
        console.log("Received state:", state);

        try {
            const response = await axios.get(
                `${BASE_URL}/api/oauth/callback/naver?code=${code}&state=${state}`
            );

            const data = response.data;

            if (data.requiresRegistration) {
                console.log("회원가입 필요: /register로 이동");
                navigate("/register", {
                    state: {
                        provider: "NAVER",
                        providerId: data.providerId,
                        email: data.email,
                        providerType: "NAVER",
                    },
                });
            } else {
                console.log("회원가입 필요 없음: 대시보드로 이동");
                localStorage.setItem("jwtToken", data.token); // 로그인 성공 토큰 저장
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("네이버 로그인 처리 중 오류:", error.response?.data || error.message);
            alert("네이버 로그인 처리 중 문제가 발생했습니다.");
        }
    };

    return (
        <div
      className="social-button naver"
      onClick={handleNaverLogin}
      style={{ backgroundImage: `url(${naverImage})` }}
    ></div>
    );
}
