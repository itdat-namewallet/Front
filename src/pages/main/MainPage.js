import React from 'react'
import '../../assets/css/main/mainPage.css';
import mainPageBackground from '../../assets/images/main/mainPageBackground.png';
import mainPageImage from '../../assets/images/main/mainPageImage.png';
import googlePlay from '../../assets/images/main/googlePlay.png';

const MainPage = () => {
    const handleGooglePlayClick = () => {
        alert('앱 출시 전 입니다. 조금만 기다려주세요! ');
      };
    
    return (
        <div className="mainPage">
            <img
              src={mainPageBackground}
              alt="backgroundImg"
              className="mainPage-background"
            />

          <div className="mainPage-content">
            <h1>명함 플랫폼</h1>
            <h1>편리한 관리</h1>
            <h1>NFC 연동 지원</h1>
            <br />
            <h1>사람과 사람을 잇다</h1>
            <div className="content-itdat">
                <h1>ITDAT</h1>
            </div>

            <button 
                className="googlePlay-button"
                onClick={handleGooglePlayClick}
            >
                <img 
                    src={googlePlay}
                    alt="googlePlay"
                    className="googlePlay"
                />
            </button>

          </div>

          <div className="mainPage-image-container">
            <img
              src={mainPageImage}
              alt="phoneImg"
              className="mainPage-image"
            />
          </div>
        </div>
      );
}

export default MainPage