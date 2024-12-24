import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/css/common/header.css';
import logo from '../../assets/images/anchor.webp';
import logoImg from "../../assets/images/logo-Img.png"
import logoGreenDot from "../../assets/images/logo-green-dot.png"

export default function Header() {

    return (
        <>
            <header className="main-header">
                <h1>
                    <div className="itdat-and-green-dot">
                        ITDAT
                        <Link to={"/admin"}>
                            <img src={logoGreenDot} />
                        </Link>

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
                        <Link to="/login-and-register" className="main-header-nav-link">로그인</Link>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </li>
                </ul>
            </header>
        </>

    );
}
