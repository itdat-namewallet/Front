import React from "react";
import Layout from "../components/common/Layout";
import "../assets/css/pages/homePage.css";

export default function HomePage() {
    const features = [
        "똑똑한 디지털 콘텐츠",
        "명함 플랫폼",
        "편리한 관리",
        "NFC 연동 지원"
    ];

    return (
        <Layout>
            <div className="home-page">
                <h1>ItDat 플랫폼에 오신 것을 환영합니다!</h1>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                {/* <img src="여기에 이미지 넣든 뭘 하던 하면 될 듯 ?" alt="플랫폼 이미지" /> */}
            </div>
        </Layout>
    );
}
