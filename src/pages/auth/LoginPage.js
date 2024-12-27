import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";
import "../../assets/css/auth/login.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 일반 로그인 처리
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
    
            if (token) {
                console.log("로그인 성공, 토큰 저장:", token);
                localStorage.setItem("jwtToken", token);
                setIsLoggedIn(true);
                navigate("/");
                window.location.reload();
            } else {
                alert("로그인 실패: 토큰 없음");
            }
        } catch (error) {
            console.error("로그인 실패:", error.response?.data || error.message);
            alert("로그인 실패");
        }
    };
    

    // 소셜 로그인 성공 처리
    const handleSocialLoginSuccess = async (provider, token) => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}/api/oauth/${provider}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (data.requiresRegistration) {
                navigate("/register", { state: data });
            } else {
                localStorage.setItem("token", data.token);
                console.log("소셜 로그인 성공, 토큰 저장:", token);
                navigate("/");
            }
        } catch (error) {
            console.error(`${provider} 로그인 실패:`, error.message);   
            alert(`${provider} 로그인 실패`);
        }
    };
    
    // 소셜 로그인 실패 처리
    const handleSocialLoginFailure = (provider, error) => {
        console.error(`${provider} 로그인 실패:`, error);
        alert(`${provider} 로그인 중 문제가 발생했습니다.`);
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
                <GoogleLoginButton
                    onSuccess={(accessToken) => handleSocialLoginSuccess("google", accessToken)}
                    onFailure={handleSocialLoginFailure}
                />
                <KakaoLoginButton
                    onSuccess={(accessToken) => handleSocialLoginSuccess("kakao", accessToken)}
                    onFailure={handleSocialLoginFailure}
                />
                <NaverLoginButton
                    onSuccess={(accessToken) => handleSocialLoginSuccess("naver", accessToken)}
                    onFailure={handleSocialLoginFailure}
                />
            </div>
        </div>
    );
}
