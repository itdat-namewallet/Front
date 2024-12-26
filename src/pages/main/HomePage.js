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
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        
        // vertical : true,
        // variableWidth: false,
        // vertical: true,
        // centerMode: true,
    };

    return (
        

        <div className="home-page-main-container">
          <div className="left-container">
            <div>
                <Slider {...settings}>
                  {/* 지금은 샘플 명함 이미지를 보여주지만,
                  앱 화면을 보여주면 좋지 않을 까 생각합니다. */}
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
              <h1>사람과 사람을 잇다</h1>
              <div className="text-box">
                <h1>ITDAT</h1>
              </div>

              {/*
                쉽게 버려지는 명함의 특성상 필히 따라오는 개인정보 유출을 막고,
                낭비되는 자원을 아껴 환경을 지킵니다.

                더 성장한 내 커리어를 바로 반영 시켜
                번거롭게 명함을 다시 제작할 이유도, 나눠줄 필요도 없습니다.
                쉽게 수정하세요.

                필요에 따라 각기 다른 명함을 제작하고,
                상대방에겐 꼭 필요한 정보만을 넘겨 전문성을 지키세요.
                그리고 모든 명함을 ITDAT에서 한번에 관리하세요.
              */}
              
              {/* <h1>ITDAT에 오신 것을 환영합니다.</h1> */}
            </div>
          </div>
        </div>
    );
}