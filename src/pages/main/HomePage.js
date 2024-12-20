import React, { useState } from "react";
import "../../assets/css/pages/main/homePage.css";

export default function HomePage() {
    // const [isScrolled, setIsScrolled] = useState(false);

    // const features = [
    //     "똑똑한 디지털 콘텐츠",
    //     "명함 플랫폼",
    //     "편리한 관리",
    //     "NFC 연동 지원"
    // ];

    return (
        <>
            <div className="home-page-main-container">
                <div className="left-container">
                    <img className="name-card-img"/>
                </div>
                <div className="right-container">
                    <div className="text-container">
                        <h1>명함 플랫폼</h1>
                        <h1>편리한 관리</h1>
                        <h1>NFC 연동 지원</h1>

                        <h1>사람과 사람을 잇는</h1>
                        <h1>ITDAT에 오신 것을 환영합니다.</h1>
                    </div>
                </div>
            </div>

        </>
            // <div className="home-page">
            //     <h1>ItDat 플랫폼에 오신 것을 환영합니다!</h1>
            //     <ul>
            //         {features.map((feature, index) => (
            //             <li key={index}>{feature}</li>
            //         ))}
            //     </ul>
            //     <img src="여기에 이미지 넣든 뭘 하던 하면 될 듯 ?" alt="플랫폼 이미지" />
            // </div>
        
    );
}
