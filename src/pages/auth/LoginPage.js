import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/auth/login.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("로그인 시도: 이메일 =", email, "비밀번호 =", password);
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
        }
    };

    const handleSocialLogin = (provider) => {
        const redirectUri = `${window.location.origin}/oauth2/${provider}`;
        console.log("소셜 로그인 리다이렉트 URI:", redirectUri);
        window.location.href = redirectUri;
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
