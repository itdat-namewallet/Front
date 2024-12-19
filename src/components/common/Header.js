import React from "react";
import { Link } from "react-router-dom";
import '../../assets/css/common/header.css';

export default function Header() {
    return (
        <header className="header">
            <h1>ItDat</h1>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/login" className="nav-link">로그인</Link>
                <Link to="/register" className="nav-link">회원가입</Link>
            </nav>
        </header>
    );
}
