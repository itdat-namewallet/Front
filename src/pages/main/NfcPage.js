import React from "react";
import Slider from "react-slick";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import descriptionImage from "../../assets/images/nfcPage/description.png";
import first_image from "../../assets/images/nfcPage/contents1/contents1-image.png";
import first_description from "../../assets/images/nfcPage/contents1/contents1-description.png";
import second_image from "../../assets/images/nfcPage/contents2/contents2-image.png";
import second_description from "../../assets/images/nfcPage/contents2/contents2-description.png";
import cardImage1 from "../../assets/images/nfcPage/cardImage1.png"
import cardImage2 from "../../assets/images/nfcPage/cardImage2.png"
import cardImage3 from "../../assets/images/nfcPage/cardImage3.png"
import cardImage4 from "../../assets/images/nfcPage/cardImage4.png"

import "../../assets/css/pages/main/nfcPage.css";
import {Link} from "react-router-dom";

const NfcPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const cards = [
        {
            id: 1,
            image: cardImage1,
            title: "김동규",
            description:
                "끊임없이 배우고 성장하는 개발자, 더 나은 웹을 만들어갑니다.",
        },
        {
            id: 2,
            image: cardImage2,
            title: "손정원",
            description:
                "문제를 해결하는 데 집중하는 개발자, 창의적인 코드를 만듭니다.",
        },
        {
            id: 3,
            image: cardImage3,
            title: "진 원",
            description:
                "유연한 사고와 끈기 있는 개발자로, 언제나 새로운 도전을 찾습니다.",
        },
        {
            id: 4,
            image: cardImage4,
            title: "서현준",
            description:
                "기술을 사랑하고 혁신을 추구하는 개발자, 코드로 세상을 연결합니다.",
        },
    ];


    const faqData = [
        {
            question: "안드로이드 폰 사용 중인데 NFC 카드가 인식되지 않습니다.",
            answer:
                "안드로이드 폰에서 인식이 안 될 때는 NFC 설정이 기본 모드인지 확인해 주세요. 카드 모드에서는 인식이 되지 않습니다.",
        },
        {
            question: "명함을 받는 사람도 앱이 설치되어 있어야 하나요?",
            answer:
                "네 NFC카드는 앱을 설치 후 NFC 화면에서 읽어 명함이 저장 됩니다. 앱이 설치되어 있으면 똑톡 앱으로 수신됩니다.",
        },
        {
            question:
                "ITDAT 앱에 3장의 명함을 사용 중인데요. 기존에 NFC 카드에 등록한 명함을 다른 명함으로 바꿀 수 있나요?",
            answer:
                "NFC 카드에 저장을 원하는 명함으로 제한 없이 다시 저장할 수 있습니다. 명함 변경 방법은 상단의 ‘NFC 카드 사용 가이드’를 참고하세요.",
        },
        {
            question: "NFC 카드에 기업 로고를 넣을 수 있나요?",
            answer:
                "기업 및 팀을 위한 NFC 카드 명함의 디자인 맞춤 제작 서비스를 제공합니다. 고객센터(itdatservice@gmail.com)로 문의해 주세요.",
        },
    ];

    return (
        <>
            <div className="nfc-page-wrapper">
                {/* Slider Section */}
                <div className="nfc-first-container">
                    <div className="slider-container">
                        <div>
                            <Slider {...settings}>
                                <div>
                                    <img
                                        className="slider-img"
                                        src={descriptionImage}
                                        alt="설명"
                                    />
                                </div>
                                <div className="nfc-slider-second-container">
                                    <img
                                        className="slider-img"
                                        src={first_image}
                                        alt="릴 카드 이미지1"
                                    />
                                    <img
                                        className="slider-img"
                                        src={first_description}
                                        alt="이미지1의 설명"
                                    />
                                </div>
                                <div className="nfc-slider-second-container">
                                    <img
                                        className="slider-img"
                                        src={second_image}
                                        alt="릴 카드 이미지2"
                                    />
                                    <img
                                        className="slider-img"
                                        src={second_description}
                                        alt="이미지2의 설명"
                                    />
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>

                {/* 새로운 NFC 카드 디자인 섹션 */}
                <div className="nfc-design-section">
                    <div className="nfc-design-header">
                        <h2>기업 및 팀을 위한</h2>
                        <h1>NFC 카드 디자인 맞춤 제작 지원</h1>
                        <p>
                            전문 디자이너들이 기업과 팀의 요구에 맞춰 세심하게 작업하여 명함
                            디자인에 대한 걱정을 덜어드립니다.
                            <br/>
                            사용하던 종이 명함의 디자인을 그대로 유지하여 사용할 수 있고,
                            브랜드 로고와 컬러를 이용하여 디자인을 세련된 스타일로 완성해
                            드립니다.
                        </p>
                        <Link to="/business-card-page" className="nfc-design-link"> {/* Link component */}
                            NFC 카드 제작 신청하기 →
                        </Link>
                    </div>
                    <div className="nfc-design-cards">
                        {cards.map((card) => (
                            <div key={card.id} className="nfc-design-card">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="nfc-design-card-img"
                                />
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* FAQ Section */}
                <div className="faq-container">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        자주 묻는 질문 (FAQ)
                    </h2>
                    <div className="space-y-6 max-w-screen-lg mx-auto">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4"
                            >
                                <h3 className="text-blue-600 font-semibold mb-2">
                                    Q. {item.question}
                                </h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default NfcPage;
