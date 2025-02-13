import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../assets/css/common/header.css';
import logoGreenDot from "../../assets/images/logo-green-dot.png";
import { adminStore } from "../../store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 li의 index를 저장
    const { isAdmin, setIsAdmin, loginedUserId, setLoginedUserId } = adminStore();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 로그인한 user의 관리자 여부 확인
    useEffect(() => {

        const bringAdmin = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setIsAdmin(false);
                return;
            }

            try {
                const token = localStorage.getItem("jwtToken");
                const response = await axios.get(`${BASE_URL}/admin/users`,
                    {
                        headers: { "Authorization": `Bearer ${token}` }
                    }
                );
                setLoginedUserId(response.data.userId)
                if (response.data.role === "ADMIN") {
                    console.log("ADMIN true");
                    setIsAdmin(true);
                } else {
                    console.log("ADMIN false");
                    setIsAdmin(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        bringAdmin();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
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
            localStorage.setItem("jwtToken", token);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
        }
    }, [navigate]);

    let location = useLocation(); // 현재 경로 정보를 가져옴
    let currentPath = location.pathname; // 현재 URL의 경로
    useEffect(() => {
        const currentPath = location.pathname; // 현재 URL의 경로
        if (currentPath.includes("/admin")) {
            setActiveIndex(0)
        }else if (currentPath === "/business-card-page") {
            setActiveIndex(2);
        }else if(currentPath.includes("/qna")){
            setActiveIndex(4)
        }else if(currentPath.includes("/business-card-page")){
            setActiveIndex(2)
        }else if(currentPath.includes("/nfc")){
            setActiveIndex(3)
        }else if(currentPath.includes("/login")){
            setActiveIndex(5)
        }else if(currentPath.includes("/register")){
            setActiveIndex(5)
        }else if(currentPath.includes("/")){
            setActiveIndex(1)
        } 
    }, [currentPath, location]);

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
            window.location.reload();
        } catch (error) {
            console.error("로그아웃 실패:", error.response?.data || error.message);
            alert("로그아웃 실패");
        }
    };

    const handleClick = (index) => {
        setActiveIndex(index); // 클릭한 li의 index를 저장
    };

    const loginCheck = (e) => {
        if(loginedUserId === ""){
            e.preventDefault();
            alert("로그인 후 이용해 주세요.");
        }
    }

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 스크롤
    };

    return (
        <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
            <h1>
                <Link to="/" className="itdat-and-green-dot" onClick={handleScrollToTop}>
                    ITDAT
                    <img src={logoGreenDot} alt="Logo" />
                </Link>
            </h1>
            <ul>
                <li
                    className={activeIndex === 0 ? "active" : ""}
                    onClick={() => handleClick(0)}
                >
                    {isAdmin ? (
                        <Link
                            to="/admin"
                            className="main-header-nav-link"
                        >
                            관리자 전용
                        </Link>
                    ) : (
                        <></>
                    )}
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li
                    className={activeIndex === 1 ? "active" : ""}
                    onClick={() => handleClick(1)}
                >
                    <Link to="/" className="main-header-nav-link">
                        소개
                    </Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li
                    className={activeIndex === 2 ? "active" : ""}
                    onClick={() => handleClick(2)}
                >
                    <Link to="/business-card-page" className="main-header-nav-link">
                        명함 제작
                    </Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li
                    className={activeIndex === 3 ? "active" : ""}
                    onClick={() => handleClick(3)}
                >
                    <Link to="nfc" className="main-header-nav-link">
                        NFC 제품
                    </Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li
                    className={activeIndex === 4 ? "active" : ""}
                    onClick={() => handleClick(4)}
                >
                    <Link to="/qna" className="main-header-nav-link" onClick={loginCheck}>
                        QnA
                    </Link>
                    <span className="main-header-icon">
                        <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                    </span>
                </li>
                <li
                    className={activeIndex === 5 ? "active" : ""}
                    onClick={() => handleClick(5)}
                >
                    {isLoggedIn ? (
                        <Link
                            onClick={handleLogout}
                            className="main-header-nav-link"
                        >
                            로그아웃
                        </Link>
                    ) : (
                        <Link
                            to="/login-and-register"
                            className="main-header-nav-link"
                        >
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
