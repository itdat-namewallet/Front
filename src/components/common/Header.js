import React from "react";
import { Link } from "react-router-dom";
import '../../assets/css/common/header.css';
import logo from '../../assets/images/anchor.webp';

export default function Header() {
    return (
        <>
            <header className="main-header">
                <img className="logo-image" src={logo} alt="이미지 로고" />
                <h1>ITDAT</h1>
                <ul>
                    <li>
                        <span>소개</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>
                        <span>명함 제작</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                        명함 제작
                    </li>
                    <li>
                        <span>NFC 제품</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>QnA
                        <span>QnA</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>
                        <span>회원 가입</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>
                        <span>로그인</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                </ul>

            </header>

            <header className="header">
                <h1>ItDat</h1>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/register" className="nav-link">회원가입</Link>
                </nav>
            </header>
        </>

    );
}
