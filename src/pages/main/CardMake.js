import React from 'react';
import '../../assets/css/main/cardMake.css';
import MakingCard from '../../assets/images/main/makingcard.png';

const CardMake = () => {
  return (
    <div className="cardmake">
      <div className="cardmake-image-container">
        <img
          src={MakingCard}
          alt="Card Make"
          className="cardmake-image"
        />
      </div>
      <div className="cardmake-content">
        <h2>내 명함의 브랜드를 살리는<br /> 커스터마이징</h2>
        <p>
          로고와 컬러로<br />
          기업과 나를 대표하는<br />
          디지털 명함을 만들어 보세요.
        </p>
      </div>
    </div>
  );
};

export default CardMake;
