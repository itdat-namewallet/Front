import React from "react";
import "../../assets/css/pages/main/homePage.css";
import slideImage0000 from "../../assets/images/prevention-of-personal-information.jpg"
import slideImage0001 from "../../assets/images/management.jpg"
import slideImage0002 from "../../assets/images/eco.png"
import thirdImage1 from "../../assets/images/homepage/third-image1.jpg"
import thirdImage2 from "../../assets/images/homepage/third-image2.jpg"
import thirdImage3 from "../../assets/images/homepage/third-image3.jpg"
import thirdImage4 from "../../assets/images/homepage/third-image4.jpg"
import Slider from "react-slick";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyWallet from "./MyWallet";
import OpenCard from "./OpenCard";
import CardMake from "./CardMake";
import MyCard from "./MyCard";
import MainPage from "./MainPage";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* 전체 스크롤 가능한 래퍼 */}
      <div className="home-page-wrapper">

          {/* 메인 페이지 */}
          <div className="mainPage-wrapper">
            <MainPage/>
          </div>

        <div className="home-page-second-box">
          <div className="second-left-container">
            <p>쉽게 버려지는 명함의 특성상</p>
            <p>필히 따라오는 개인정보 유출을 막고,</p>
            <p>낭비되는 자원을 아껴 환경을 지킵니다.</p>
            <br />
            <p>더 성장한 내 커리어를 바로 반영 시켜</p>
            <p>번거롭게 명함을 다시 제작할 이유도,</p>
            <p>나눠줄 필요도 없습니다.</p>
            <br />
            <p>필요에 따라 각기 다른 명함을 제작하고,</p>
            <p>상대방에겐 꼭 필요한 정보만을 넘겨</p>
            <p>전문성을 지키세요.</p>
            <br />
            <h2>명함 관리의 모든 게 잇다</h2>
            <h2>ITDAT</h2>
          </div>
          <div className="second-right-container">
            <Slider {...settings}>
              <div>
                <img className="name-card-img" src={slideImage0000} alt="Name Card 000" />
              </div>
              <div>
                <img className="name-card-img" src={slideImage0001} alt="Name Card 001" />
              </div>
              <div>
                <img className="name-card-img" src={slideImage0002} alt="Name Card 100" />
              </div>
            </Slider>
          </div>
        </div>
        <div className="home-page-third-box">
          <div className="head-line">
            <p>꼭 필요한 기능만을 담은</p>
            <h1>명확한 UI</h1>
          </div>
          
            <div className="center-box">

              <div className="text-and-img">
                <p>내 명함</p>
                  <img src={thirdImage1}/>
              </div>

              <div className="text-and-img">
                <p>명함첩</p>
                  <img src={thirdImage2}/>
              </div>

              <div className="text-and-img">
                <p>공개 명함</p>
                  <img src={thirdImage3}/>
              </div>

              <div className="text-and-img">
                <p>내 정보</p>
                  <img src={thirdImage4}/>  
              </div>

            </div>
         
        </div>

        {/* 내명함 컴포넌트 */}
        <div className="myCard-wrapper">
          <MyCard />
        </div>

        {/* 명함첨 컴포넌트 */}
        <div className="mywallet-wrapper">
          <MyWallet />
        </div>

        {/* 명함제작 컴포넌트 */}
        <div className="cardmake-wrapper">
          <CardMake />
        </div>

        {/* 공개명함 컴포넌트 */}
        <div className="opencard-wrapper">
          <OpenCard />
        </div>
      </div>
    </>
  );
}
