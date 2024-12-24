import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLoginButton() {
    const navigate = useNavigate();

    const handleGoogleLogin = async (idToken) => {
        // console.log("Google ID Token:", idToken);

        try {
            const response = await axios.post("http://localhost:8082/api/oauth/google", { 
                idToken,
                providerType: "GOOGLE",
        });
            // console.log("서버 응답:", response.data);

            if (response.data.requiresRegistration) {
                // 신규 사용자 회원가입 페이지로 이동
                navigate("/register", {
                    state: {
                        provider: "GOOGLE",
                        providerId: response.data.providerId,
                        email: response.data.email,
                    },
                });
            } else {
                // 기존 사용자 로그인 성공 처리
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigate("/"); // 로그인 성공 후 대시보드로 이동
            }
        } catch (error) {
            console.error("로그인 실패:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response) => {
                        // console.log("Google Response:", response);
                        if (response.credential) {
                            handleGoogleLogin(response.credential);
                        } else {
                            console.error("Google 로그인 실패: credential 없음");
                        }
                    },
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-login-button"),
                    { theme: "outline", size: "large" }
                );
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="google-login-button"></div>;
}
