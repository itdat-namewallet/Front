import React from "react";
import "../../assets/css/common/footer.css";
import upArrow from "../../assets/images/up_arrow.png";

export default function Footer({ className }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-content">
        <div className="footer-left">
          <h4>ITDAT</h4>
          <p>대표: 김동규</p>
          <p>이메일: zzsehdrb@gmail.com</p>
          <p>전화번호: 010-6816-4788</p>
        </div>
        <div className="footer-center">
          <ul className="center-links">
            <li>
              <a href="/" className="footer-link">
                소개
              </a>
            </li>
            <li>
              <a href="/business-card-page" className="footer-link">
                명함 제작
              </a>
            </li>
            <li>
              <a href="/" className="footer-link">
                NFC 제품
              </a>
            </li>
            <li>
              <a href="/qna" className="footer-link">
                QnA
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <ul className="right-links">
            <li>
              <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="footer-link">
                서비스 이용약관
              </a>
            </li>
            <li>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="footer-link">
                개인정보 처리방침
              </a>
            </li>
          </ul>
          <img
            src={upArrow}
            alt="맨 위로"
            className="scroll-to-top-image"
            onClick={scrollToTop}
          />
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright &copy; 2025 ITDAT 디지털 명함 서비스 All rights reserved.</p>
      </div>
    </footer>
  );
}
