import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../assets/css/common/header.css';
import logoGreenDot from "../../assets/images/logo-green-dot.png";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log("localStorage에서 가져온 토큰:", token);
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            console.log("URL에서 추출한 토큰:", token);
            localStorage.setItem("jwtToken", token);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            localStorage.removeItem("jwtToken");
            setIsLoggedIn(false);
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
                    <Link to="/admin">
                        <img src={logoGreenDot} alt="Logo" />
                    </Link>
                </div>
            </h1>
            <ul>
                <li>
                    <Link to="/" className="main-header-nav-link">소개</Link>
                </li>
                <li>
                    <span>명함 제작</span>
                </li>
                <li>
                    <span>NFC 제품</span>
                </li>
                <li>
                    <Link to="/qna" className="main-header-nav-link">QnA</Link>
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
                </li>
            </ul>
        </header>
    );
}
