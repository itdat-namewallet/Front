import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/auth/login.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 일반 로그인 처리
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
        }
    };

    // 소셜 로그인 처리
    const handleSocialLogin = async (provider) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/oauth/${provider}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            // 서버에서 이미 회원가입이 된 경우
            if (!data.requiresRegistration) {
                localStorage.setItem("token", data.token); // 로그인 완료
                navigate("/"); // 홈으로 이동
            } else {
                // 회원가입이 필요한 경우 RegisterPage로 이동
                navigate("/register", {
                    state: {
                        provider,                      // 소셜 제공자 (GOOGLE, KAKAO, NAVER)
                        providerId: data.providerId,   // 소셜 로그인 고유 ID
                        email: data.email,             // 소셜 이메일
                    },
                });
            }
        } catch (error) {
            console.error("소셜 로그인 요청 실패:", error.response?.data || error.message);
            alert(error.response?.data?.message || "소셜 로그인 실패");
        }
    };
    
    
    

    return (
        <div className="login-page">
            <h1>로그인</h1>
            <div className="form-group">
                <label>이메일</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                />
            </div>
            <div className="form-group">
                <label>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                로그인
            </button>

            {/* 구분선 */}
            <div className="separator">
                <hr />
                <span className="or-text">또는</span>
            </div>

            {/* 소셜 로그인 버튼 */}
            <div className="social-buttons">
                <button className="social-button google" onClick={() => handleSocialLogin("google")}>
                    Google로 로그인
                </button>
                <button className="social-button naver" onClick={() => handleSocialLogin("naver")}>
                    Naver로 로그인
                </button>
                <button className="social-button kakao" onClick={() => handleSocialLogin("kakao")}>
                    Kakao로 로그인
                </button>
            </div>
        </div>
    );
}
