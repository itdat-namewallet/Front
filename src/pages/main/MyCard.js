import React, { useEffect, useRef, useState } from 'react'
// import videoSrc from '../../assets/video/myCard.mp4';
import '../../assets/css/main/myCard.css';

const MyCard = () => {

    const videoRef = useRef(null);
      const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          if (videoRef.current) {
            const rect = videoRef.current.getBoundingClientRect();
            const isInViewport =
              rect.top >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    
            setIsVisible(isInViewport);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      useEffect(() => {
        const video = videoRef.current;
    
        if (video) {
          const playPromise = isVisible ? video.play() : video.pause();
    
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn('Video playback issue:', error);
            });
          }
        }
      }, [isVisible]);

  return (
        <div className="myCard">
          <div className="myCard-video-container">
            <video
              ref={videoRef}
            //   src={videoSrc}
              type="video/mp4"
              muted
              loop
              className="myCard-video"
            />
          </div>
          <div className="myCard-content">
            <h2>당신의 이야기를 담은 특별한 프로필</h2>
            <p>
              포트폴리오와 간단한 이력을 손쉽게 작성해<br/>
              한 장의 명함으로 당신을 더 돋보이게 하세요.
            </p>
            <br/>
            <p>
            단순한 연락처를 넘어 나를 효과적으로 소개할 수 있습니다.
            </p>
            <br/>
            <p>
              당신을 한눈에 담은 스마트 명함<br/>
              새로운 기회의 문을 여는 열쇠가 됩니다.
            </p>
          </div>
        </div>
  )
}

export default MyCard