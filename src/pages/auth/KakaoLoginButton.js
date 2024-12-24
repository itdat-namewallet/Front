import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JS_KEY;

export default function KakaoLoginButton() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.Kakao) {
            const script = document.createElement("script");
            script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
            script.async = true;

            script.onload = () => {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
                    // console.log("Kakao SDK 초기화 완료");
                }
            };

            script.onerror = () => {
                console.error("Kakao SDK 로드 실패");
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
            // console.log("Kakao SDK 초기화 완료");
        }
    }, []);

    const handleKakaoLogin = async () => {
        if (!window.Kakao) {
            console.error("Kakao SDK가 로드되지 않았습니다.");
            return;
        }

        window.Kakao.Auth.login({
            success: async (authObj) => {
                // console.log("Kakao Access Token:", authObj.access_token);

                try {
                    const response = await axios.post(
                        "http://localhost:8082/api/oauth/kakao",
                        {}, // Body는 필요 없음
                        {
                            headers: {
                                Authorization: `Bearer ${authObj.access_token}`,
                            },
                        }
                    );

                    // console.log("서버 응답:", response.data);

                    if (response.data.requiresRegistration) {
                        // 회원가입 페이지로 이동
                        navigate("/register", {
                            state: {
                                provider: "KAKAO",
                                providerId: response.data.providerId,
                                email: response.data.email,
                            },
                        });
                    } else {
                        // 로그인 성공
                        const token = response.data.token;
                        localStorage.setItem("token", token);
                        navigate("/");
                    }
                } catch (error) {
                    console.error("카카오 로그인 실패:", error.response?.data || error.message);
                    alert("카카오 로그인에 실패했습니다.");
                }
            },
            fail: (err) => {
                console.error("Kakao 로그인 실패:", err);
                alert("카카오 로그인에 실패했습니다.");
            },
        });
    };

    return (
        <button className="social-button kakao" onClick={handleKakaoLogin}>
            Kakao 계정으로 로그인
        </button>
    );
}
