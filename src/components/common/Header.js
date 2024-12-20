import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
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
                    </li>
                    <li>
                        <span>NFC 제품</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>
                        <span>QnA</span>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                    <li>
                        <Link to="/login-and-register" className="main-header-nav-link">로그인</Link>
                        <span className="main-header-icon">
                            <img className="logo-image" src={logo} alt="이미지 로고" />
                        </span>
                    </li>
                </ul>
            </header>
        </>

    );
}
