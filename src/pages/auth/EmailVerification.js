import React, { useState, useEffect } from "react";
import axios from "axios";

/*
    --------------------------------------------------------
    작성자 : 김동규
    작성일 : 2024-12-13
    설명   : 이메일 인증 관련 컴포넌트
    ---------------------------------------------------------
*/

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function EmailVerification({ email, setEmail, isVerified, setIsVerified }) {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        if (isCodeSent && timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isCodeSent, timer]);

    const sendVerificationCode = async () => {
        try {
            await axios.post(`${BASE_URL}/api/auth/send-verification-code`, { email });
            setIsCodeSent(true);
            setTimer(300);
            alert("인증번호가 발송되었습니다.");
        } catch (error) {
            alert("인증번호 발송 실패");
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/verify-code`, { email, code: verificationCode });
            if (response.data.success) {
                setIsVerified(true);
                alert("인증 성공!");
            } else {
                alert("인증 실패");
            }
        } catch (error) {
            alert("인증 확인 실패");
        }
    };

    const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${seconds % 60}`;

    return (
        <div>
            <label>이메일</label>
            <div className="email-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
                <button onClick={sendVerificationCode} disabled={isCodeSent}>
                    {isCodeSent ? "재발송" : "발송"}
                </button>
            </div>
            {isCodeSent && (
                <div>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증번호 입력"
                    />
                    <button onClick={verifyCode}>확인</button>
                    <span>{formatTime(timer)}</span>
                </div>
            )}
        </div>
    );
}
