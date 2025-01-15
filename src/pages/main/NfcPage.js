import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import descriptionImage from "../../assets/images/nfcPage/description.png"
import first_image from "../../assets/images/nfcPage/contents1/contents1-image.png"
import first_description from "../../assets/images/nfcPage/contents1/contents1-description.png"
import second_image from "../../assets/images/nfcPage/contents2/contents2-image.png"
import second_description from "../../assets/images/nfcPage/contents2/contents2-description.png"


import nameCard000 from "../../assets/images/test-name-card/000.png";
import nameCard001 from "../../assets/images/test-name-card/001.png";
import nameCard100 from "../../assets/images/test-name-card/100.png";
import nameCard101 from "../../assets/images/test-name-card/101.png";

import "../../assets/css/pages/main/nfcPage.css"

const NfcPage = () => {

    // useEffect(() => {
    //     window.dispatchEvent(new Event('resize'));
    // }, []);

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
        <>
            <div className="nfc-page-wrapper">
                <div className="nfc-first-container">
                    <div className="slider-container">
                        <div>
                            <Slider {...settings}>
                                <div>
                                    <img className="slider-img" src={descriptionImage} alt="설명" />
                                </div>
                                <div className="nfc-slider-second-container">
                                    <img className="slider-img" src={first_image} alt="릴 카드 이미지1" />
                                    <img className="slider-img" src={first_description} alt="이미지1의 설명" />
                                </div>
                                <div className="nfc-slider-second-container">
                                    <img className="slider-img" src={second_image} alt="릴 카드 이미지2" />
                                    <img className="slider-img" src={second_description} alt="이미지2의 설명" />
                                </div>
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}
export default NfcPage;