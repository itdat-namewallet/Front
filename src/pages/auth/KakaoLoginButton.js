import React, { useEffect } from "react";

const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JS_KEY;

export default function KakaoLoginButton({ onSuccess, onFailure }) {
    useEffect(() => {
        if (!window.Kakao) {
            const script = document.createElement("script");
            script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
            script.async = true;

            script.onload = () => {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
                }
            };

            script.onerror = () => {
                console.error("Kakao SDK 로드 실패");
                onFailure(new Error("Kakao SDK 로드 실패"));
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
        }
    }, [onSuccess, onFailure]);

    const handleKakaoLogin = () => {
        if (!window.Kakao) {
            onFailure(new Error("Kakao SDK 로드 실패"));
            return;
        }
    
        window.Kakao.Auth.login({
            success: (authObj) => {
                console.log("Kakao Access Token:", authObj.access_token);
                onSuccess(authObj.access_token);
            },
            fail: (err) => {
                onFailure(err);
            },
        });
    };
    

    return (
        <button className="social-button kakao" onClick={handleKakaoLogin}>
            Kakao 계정으로 로그인
        </button>
    );
}
