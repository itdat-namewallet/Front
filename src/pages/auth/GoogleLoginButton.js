import React, { useEffect } from "react";
import axios from "axios";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLoginButton({ onSuccess, onFailure }) {
    const handleGoogleLogin = async (idToken) => {
        try {
            // 백엔드로 ID Token 전달
            const response = await axios.post("http://localhost:8082/api/oauth/google", null, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            console.log("Google 로그인 성공:", response.data);
            console.log("Google Credential (ID Token):", idToken);
            onSuccess(response.data); // 부모 컴포넌트에 성공 결과 전달
        } catch (error) {
            console.error("Google 로그인 실패:", error.response?.data || error.message);
            onFailure(error.message);
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
                    callback: async (response) => {
                        console.log("Google Response:", response);
                        if (response.credential) {
                            await handleGoogleLogin(response.credential); // ID Token 처리
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
