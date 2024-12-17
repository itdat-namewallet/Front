import React, { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log("로그인 시도: 이메일 =", email, "비밀번호 =", password);
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            alert("로그인 성공!");
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
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
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
}
