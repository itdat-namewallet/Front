import React, { useState } from "react";
import "../../assets/css/pages/main/homePage.css";
import nameCard000 from "../../assets/images/test-name-card/000.png";
import nameCard001 from "../../assets/images/test-name-card/001.png";
import nameCard100 from "../../assets/images/test-name-card/100.png";
import nameCard101 from "../../assets/images/test-name-card/101.png";
import Slider from "react-slick";
import "slick-carousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
        // vertical : true,
        variableWidth: false,
        // centerMode: true,
    };

    return (
        

        <div className="home-page-main-container">
          <div className="left-container">
            <div>
                <Slider {...settings}>
              <div>
                <img className="name-card-img" src={nameCard000} alt="Name Card 000" />
              </div>
              <div>
                <img className="name-card-img" src={nameCard001} alt="Name Card 001" />
              </div>
              <div>
                <img className="name-card-img" src={nameCard100} alt="Name Card 100" />
              </div>
              <div>
                <img className="name-card-img" src={nameCard101} alt="Name Card 101" />
              </div>
            </Slider>
            </div>
            
          </div>
          <div className="right-container">
            <div className="text-container">
              <h1>명함 플랫폼</h1>
              <h1>편리한 관리</h1>
              <h1>NFC 연동 지원</h1>
              <br/>
              <br/>
              <h1>사람과 사람을 잇는</h1>
              <h1>ITDAT에 오신 것을 환영합니다.</h1>
            </div>
          </div>
        </div>
    );
}