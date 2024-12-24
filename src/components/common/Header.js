import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../assets/css/common/header.css';
import logoGreenDot from "../../assets/images/logo-green-dot.png";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSocialUser, setIsSocialUser] = useState(false);
    const navigate = useNavigate();

    // 사용자 정보 확인
    useEffect(() => {
        const fetchUserInfo = async () => {
            console.log("useEffect 실행");
            try {
                const token = localStorage.getItem("token");
                console.log("토큰 확인:", token);

                if (!token) {
                    console.log("토큰 없음: 비로그인 상태");
                    setIsLoggedIn(false);
                    return;
                }

                const response = await axios.get(`${BASE_URL}/api/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("사용자 정보:", response.data);
                setIsLoggedIn(true);
                setIsSocialUser(response.data.isSocialUser || false); // 소셜 로그인 여부 설정
            } catch (error) {
                console.error("사용자 정보 가져오기 실패:", error.response?.data || error.message);
                setIsLoggedIn(false);
            }
        };

        fetchUserInfo();
    }, []);

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            localStorage.removeItem("token");
            setIsLoggedIn(false); 
            setIsSocialUser(false);
            navigate("/login-and-register");
        } catch (error) {
            console.error("로그아웃 실패:", error.response?.data || error.message);
            alert("로그아웃 실패");
        }
    };

    return (
        <header className="main-header">
            <h1>
                <div className="itdat-and-green-dot">
                   ITDAT
                   <img src={logoGreenDot} alt="Logo" />
                </div>
            </h1>
            <ul>
                <li>
                    <Link to="/" className="main-header-nav-link">소개</Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li>
                    <span>명함 제작</span>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li>
                    <span>NFC 제품</span>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li>
                    <Link to="/qna" className="main-header-nav-link">QnA</Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="main-header-nav-link">
                            로그아웃
                        </button>
                    ) : (
                        <Link to="/login-and-register" className="main-header-nav-link">
                            로그인
                        </Link>
                    )}
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
            </ul>
        </header>
    );
}
