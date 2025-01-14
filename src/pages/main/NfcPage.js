import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import nameCard000 from "../../assets/images/test-name-card/000.png";
import nameCard001 from "../../assets/images/test-name-card/001.png";
import nameCard100 from "../../assets/images/test-name-card/100.png";
import nameCard101 from "../../assets/images/test-name-card/101.png";

import "../../assets/css/pages/main/nfcPage.css"

const NfcPage = () => {

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

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
            {/* <div className="slider-container">
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
            </div> */}
            
        </>
    )
}
export default NfcPage;