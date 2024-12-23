import React from "react";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;

export default function NaverLoginButton({ onSuccess, onFailure }) {
    const handleNaverLogin = () => {
        const popup = window.open(
            `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/callback")}`,
            "naverLoginPopup",
            "width=500,height=600"
        );
    
        const interval = setInterval(() => {
            try {
                if (!popup || popup.closed) {
                    clearInterval(interval);
                    console.error("팝업이 닫혔습니다");
                    onFailure(new Error("팝업이 닫혔습니다"));
                    return;
                }
    
                const hash = popup.location.hash;
                if (hash.includes("access_token")) {
                    const params = new URLSearchParams(hash.substring(1));
                    const accessToken = params.get("access_token");
                    console.log("Naver Access Token:", accessToken);
                    clearInterval(interval);
                    popup.close();
                    onSuccess(accessToken);
                }
            } catch (err) {
                // Cross-origin 에러 무시
            }
        }, 500);
    };

    return (
        <button className="social-button naver" onClick={handleNaverLogin}>
            Naver 계정으로 로그인
        </button>
    );
}
