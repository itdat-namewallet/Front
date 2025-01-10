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
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [verificationTimeLeft, setVerificationTimeLeft] = useState(0);
    const [verificationStatus, setVerificationStatus] = useState("");
  
    useEffect(() => {
      let resendTimer;
      let verificationTimer;
  
      if (resendCooldown > 0) {
        resendTimer = setInterval(() => {
          setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }
  
      if (verificationTimeLeft > 0) {
        verificationTimer = setInterval(() => {
          setVerificationTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }
  
      return () => {
        clearInterval(resendTimer);
        clearInterval(verificationTimer);
      };
    }, [resendCooldown, verificationTimeLeft]);
  
    const sendVerificationCode = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/email/send`, { email });
        if (response.status === 200) {
          setIsCodeSent(true);
          setVerificationStatus("인증 코드가 이메일로 발송되었습니다.");
          setVerificationTimeLeft(300); // 5분
          setResendCooldown(60); // 재발송 제한 1분
        }
      } catch (error) {
        setVerificationStatus("인증 코드 발송에 실패했습니다.");
      }
    };
  
    const verifyCode = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/email/verify`, {
          email,
          code: verificationCode,
        });
        if (response.status === 200) {
          setIsVerified(true);
          setVerificationStatus("이메일 인증이 완료되었습니다.");
        }
      } catch (error) {
        setVerificationStatus("인증 코드가 올바르지 않습니다.");
      }
    };
  
    return (
      <div className="email-verification">
        <label>이메일</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="form-input"
            style={{ flex: 1, marginRight: "8px" }}
          />
          <button
            onClick={sendVerificationCode}
            disabled={resendCooldown > 0 || isVerified}
            className="btn"
          >
            {isCodeSent
              ? resendCooldown > 0
                ? `재발송 (${resendCooldown}s)`
                : "재발송"
              : "인증 코드 발송"}
          </button>
        </div>
        {isCodeSent && !isVerified && (
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증 코드를 입력하세요"
              className="form-input"
              style={{ flex: 1, marginRight: "8px" }}
            />
            <button onClick={verifyCode} className="btn">
              인증
            </button>
          </div>
        )}
        {verificationTimeLeft > 0 && !isVerified && (
          <p style={{ marginTop: "8px", color: "red" }}>
            유효 시간: {Math.floor(verificationTimeLeft / 60)}분 {verificationTimeLeft % 60}초
          </p>
        )}
        {verificationStatus && <p style={{ marginTop: "8px" }}>{verificationStatus}</p>}
        {isVerified && <p style={{ color: "green" }}>이메일 인증 완료</p>}
      </div>
    );
  }